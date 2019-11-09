import { RootNode, InternalState } from '../../root/RootNode';
import { ControlProps, ControlListener, ControlListenerUpdate } from './Control.types';

import Styles from '../../../sass/control.sass';
import Base from '../../../sass/base.sass';

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
    if (props.userListener) {
      this.listeners.set('user', props.userListener);
    }
  }

  private onDisabled: ControlListener = (update: ControlListenerUpdate) => {
    if (update.value === true) {
      if (!this.element.classList.contains(Base.disabled)) {
        this.element.classList.add(Base.disabled);
      }
      if (!this.controlElement.hasAttribute('disabled')) {
        this.controlElement.setAttribute('disabled', 'true');
      }
    } else {
      if (this.element.classList.contains(Base.disabled)) {
        this.element.classList.remove(Base.disabled);
      }
      if (this.controlElement.hasAttribute('disabled')) {
        this.controlElement.removeAttribute('disabled');
      }
    }
  }

  private createRootDiv(): HTMLDivElement {
    const element = document.createElement('div');
    element.classList.add(Styles.control);
    return element;
  }

  private createControlElement(template: string, name: string, id: string): HTMLDivElement {
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
}
