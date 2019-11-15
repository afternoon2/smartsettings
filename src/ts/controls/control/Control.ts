import { RootNode, InternalState } from '../../root/RootNode';
import { ControlProps, ControlListener, ControlListenerUpdate } from './Control.types';

import Styles from '../../../sass/control.sass';

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
    if (props.userListener) {
      this.listeners.set('user', props.userListener);
    }
  }

  set value(value: string) {
    this.state.value = value;
  }

  get value(): string {
    return this.state.value as string;
  }

  get readonly(): boolean {
    return this.state.readonly  as boolean;
  }

  set readonly(readonly: boolean) {
    this.state.readonly = readonly;
  }

  protected createRootDiv(): HTMLDivElement {
    const element = document.createElement('div');
    element.classList.add(Styles.control);
    return element;
  }

  protected createControlElement(template: string, name: string, id: string): HTMLDivElement {
    const element = this.createRootDiv();
    const main = document.createElement('main');
    main.classList.add(Styles.control__body);
    main.setAttribute('id', id);
    main.insertAdjacentHTML(
      'beforeend',
      `<p class="${Styles.control__name}" title="${name}">${name}</p>`,
    );
    const content = document.createElement('div');
    content.classList.add(Styles.control__content);
    content.insertAdjacentHTML('beforeend', template);
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
