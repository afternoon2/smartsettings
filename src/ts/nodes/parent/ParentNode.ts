import cuid from 'cuid';

import { RootNode } from '../../root/RootNode';
import { ButtonControl, ButtonControlProps } from '../../controls/button/ButtonControl';
import { TextControl, TextControlProps } from '../../controls/text/TextControl';
import { TextAreaControl, TextAreaControlProps } from '../../controls/textarea/TextAreaControl';
import { CheckboxControl, CheckboxControlProps } from '../../controls/checkbox/CheckboxControl';
import { FileControl, FileControlProps } from '../../controls/file/FileControl';
import { NumberControl, NumberControlProps } from '../../controls/number/NumberControl';
import { RangeControl, RangeControlProps } from '../../controls/range/RangeControl';
import { DropDownControl, DropDownControlProps } from '../../controls/dropdown/DropDown';
import { ColorControl, ColorControlProps } from '../../controls/color/Color';
import { SectionNode } from '../section/Section';
import {
  Listener,
  ListenerUpdate,
  InternalState,
  ControlOptions,
  ParentOptions,
} from '../../types';

import Base from '../../../sass/base.sass';

export type AnyControl = ButtonControl
| TextControl
| TextAreaControl
| CheckboxControl
| FileControl
| NumberControl
| RangeControl
| DropDownControl
| ColorControl;

export type ParentNodeProps = {
  id: string,
  options: ParentOptions,
  template: (state: InternalState) => string,
  parentElement: HTMLElement,
}
export abstract class ParentNode extends RootNode {
  public parentElement: HTMLElement;
  public element: HTMLElement;

  public abstract bodyElement: HTMLElement;
  public abstract headerElement: HTMLElement;

  protected state: InternalState;
  protected listeners: Map<string, Listener> = new Map();
  protected stateHandler: ProxyHandler<InternalState> = {
    set: this.createStateSetter(),
  };
  protected registry: Map<string, AnyControl | SectionNode> = new Map();

  constructor(props: ParentNodeProps) {
    super();
    this.state = this.createState(props.id, props.options, this.stateHandler);
    this.parentElement = props.parentElement;
    this.element = this.createRootElement(props.template(this.state));

    this.parentElement.appendChild(this.element);
    this.listeners.set('invisible', this.onInvisible);
    this.listeners.set('disabled', this.onDisabled);
    this.listeners.set('collapsed', this.onCollapsed);
  }

  get collapsed(): boolean {
    return Boolean(this.state.collapsed);
  }

  open() {
    this.state.collapsed = false;
  }

  close() {
    this.state.collapsed = true;
  }

  toggle() {
    this.state.collapsed = !this.state.collapsed;
  }

  abstract control(
    control: string,
    options: ControlOptions,
  ): AnyControl | null;

  protected createControl = (
    control: string,
    options: ControlOptions, 
    sectionListener?: Listener,
    panelListener?: Listener,
  ): AnyControl | null => {
    const id: string = cuid();
    const parentElement = this.bodyElement;
    const props = {
      id,
      options,
      parentElement,
      sectionListener,
      panelListener,
    };
    let instance;
    switch (control) {
      case 'button':
        instance = new ButtonControl(props as ButtonControlProps);
        break;
      case 'checkbox':
        instance = new CheckboxControl(props as CheckboxControlProps);
        break;
      case 'dropdown':
        instance = new DropDownControl(props as DropDownControlProps);
        break;
      case 'file':
        instance = new FileControl(props as FileControlProps);
        break;
      case 'number':
        instance = new NumberControl(props as NumberControlProps);
        break;
      case 'range':
        instance = new RangeControl(props as RangeControlProps);
        break;
      case 'text':
        instance = new TextControl(props as TextControlProps);
        break;
      case 'textarea':
        instance = new TextAreaControl(props as TextAreaControlProps);
        break;
      case 'color':
        instance = new ColorControl(props as ColorControlProps);
        break;
      default:
        instance = null;
        break;
    }
    if (instance !== null) {
      this.registry.set(id, instance);
    }
    return instance;
  }

  protected onCollapsed: Listener = (update: ListenerUpdate) => {
    const { classList } = this.bodyElement;
    const toggle = this.headerElement.querySelector('a') as HTMLAnchorElement;
    if (update.value === true) {
      if (!classList.contains(Base.hidden)) {
        classList.add(Base.hidden);
      }
      toggle.innerHTML = '&#9662;';
    } else {
      if (classList.contains(Base.hidden)) {
        classList.remove(Base.hidden);
      }
      toggle.innerHTML = '&#9656;';
    }
  }

  protected createRootElement(template: string): HTMLElement {
    const rootElement = document.createElement('div');
    rootElement.insertAdjacentHTML('beforeend', template);
    return rootElement;
  }

  protected fillInElement(className: string) {
    this.element.classList.add(className);
    this.element.setAttribute('id', this.id);
    this.onDisabled({
      targetId: this.id,
      key: 'disabled',
      value: this.state.disabled as boolean,
      listenerType: 'builtin',
    });
  }
}
