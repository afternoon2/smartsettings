import { RootNode, InternalState } from '../../root/RootNode';
import { ControlProps, ControlListener, ControlListenerUpdate } from './Control.types';

import Styles from '../../../sass/control.sass';
import Button from '../../../sass/button.sass';

export abstract class Control extends RootNode {
  public parentElement: HTMLElement;
  public element: HTMLElement;
  public abstract controlElement: HTMLElement;

  protected state: InternalState;
  protected listeners: Map<string, ControlListener> = new Map();

  private stateHandler: ProxyHandler<InternalState> = {
    set: this.createStateSetter(),
  }

  constructor(
    props: ControlProps,
    template: (state: InternalState) => string
  ) {
    super();
    this.state = this.createState(
      props.id, props.name, props.options,
      this.stateHandler,
    );
    this.parentElement = props.parentElement;
    this.element = this.createControlElement(template(this.state), this.state.name, this.state.id);
    this.parentElement.appendChild(this.element);
    this.listeners.set('invisible', this.onInvisible);
    this.listeners.set('disabled', this.onDisabled);
    this.listeners.set('readonly', this.onReadonlyChange);
    if (props.listener) {
      this.listeners.set('control', props.listener);
    }
    if (props.sectionListener) {
      this.listeners.set('section', props.sectionListener);
    }
    if (props.panelListener) {
      this.listeners.set('panel', props.panelListener);
    }
  }

  get readonly(): boolean {
    return this.state.readonly  as boolean;
  }

  set readonly(readonly: boolean) {
    this.state.readonly = readonly;
  }

  setListener(listener: ControlListener) {
    this.listeners.set('control', listener);
  }

  protected createRootDiv(): HTMLDivElement {
    const element = document.createElement('div');
    element.classList.add(Styles.control);
    return element;
  }

  protected createControlElement(template: string, name: string, id: string): HTMLDivElement {
    const element = this.createRootDiv();
    const main = document.createElement('main');
    const isButton = template.search(Button.button) > -1;
    main.classList.add(Styles.control__body);
    main.setAttribute('id', id);
    if (!isButton) {
      main.insertAdjacentHTML(
        'beforeend',
        `<p class="${Styles.control__name}" title="${name}">${name}</p>`,
      );
    }
    const content = document.createElement('div');
    content.classList.add(Styles.control__content);
    content.insertAdjacentHTML('beforeend', template);
    if (isButton) {
      content.classList.add(Styles['control__content--button']);
    }
    main.appendChild(content);
    element.appendChild(main);
    return element;
  }

  private onReadonlyChange: ControlListener = (update: ControlListenerUpdate) => {
    if (update.value === true) {
      if (!this.controlElement.hasAttribute('readonly')) {
        this.controlElement.setAttribute('readonly', 'true');
      }
    } else {
      if (this.controlElement.hasAttribute('readonly')) {
        this.controlElement.removeAttribute('readonly');
      }
    }
  }
}
