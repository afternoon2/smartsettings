import cuid from 'cuid';

import { RootNode, InternalState } from '../../root/RootNode';
import {
  ControlListener,
  ControlListenerUpdate,
  ControlOptions,
  TextControlProps,
  TextAreaControlProps,
  CheckboxControlProps,
  FileControlProps,
  NumberControlProps,
  RangeControlProps,
  ButtonControlProps,
} from '../../controls/control/Control.types';
import { ParentProps } from '../nodes.types';

import Base from '../../../sass/base.sass';
import { ButtonControl } from '../../controls/button/ButtonControl';
import { TextControl } from '../../controls/text/TextControl';
import { TextAreaControl } from '../../controls/textarea/TextAreaControl';
import { CheckboxControl } from '../../controls/checkbox/CheckboxControl';
import { FileControl } from '../../controls/file/FileControl';
import { NumberControl } from '../../controls/number/NumberControl';
import { RangeControl } from '../../controls/range/RangeControl';
import { SectionNode } from '../section/Section';

export type AnyControl = ButtonControl
| TextControl
| TextAreaControl
| CheckboxControl
| FileControl
| NumberControl
| RangeControl;

export abstract class ParentNode extends RootNode {
  public parentElement: HTMLElement;
  public element: HTMLElement;
  public abstract bodyElement: HTMLElement;
  public abstract headerElement: HTMLElement;

  protected state: InternalState;
  protected listeners: Map<string, ControlListener> = new Map();
  protected stateHandler: ProxyHandler<InternalState> = {
    set: this.createStateSetter(),
  };
  protected registry: Map<string, AnyControl | SectionNode> = new Map();

  constructor(
    props: ParentProps,
    template: (state: InternalState) => string
  ) {
    super();
    this.state = this.createState(props.id, props.name, props.options, this.stateHandler);
    this.parentElement = props.parentElement;
    this.element = this.createRootElement(template(this.state));

    this.parentElement.appendChild(this.element);
    this.listeners.set('invisible', this.onInvisible);
    this.listeners.set('disabled', this.onDisabled);
    this.listeners.set('collapsed', this.onCollapsed);
    if (props.userListener) {
      this.listeners.set('user', props.userListener);
    }
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

  control(
    control: string, 
    name: string, 
    options: ControlOptions | null, 
    userListener?: ControlListener
  ): AnyControl | null {
    const id: string = cuid();
    const parentElement = this.bodyElement;
    const props = {
      id, name, options: options || {}, parentElement, userListener,
    };
    let instance;
    switch (control) {
      case 'button':
        instance = new ButtonControl(props as ButtonControlProps);
        break;
      case 'checkbox':
        instance = new CheckboxControl(props as CheckboxControlProps);
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
      default:
        instance = null;
        break;
    }
    if (instance !== null) {
      this.registry.set(id, instance);
    }
    return instance;
  }

  protected onCollapsed: ControlListener = (update: ControlListenerUpdate) => {
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
    this.onDisabled({
      id: this.id,
      key: 'disabled',
      value: this.state.disabled as boolean,
    });
  }
}
