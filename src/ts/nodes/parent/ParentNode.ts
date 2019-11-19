import { RootNode, InternalState } from '../../root/RootNode';
import { ControlListener, ControlListenerUpdate } from '../../controls/control/Control.types';
import { ParentProps } from '../nodes.types';

import Base from '../../../sass/base.sass';

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

  protected onCollapsed: ControlListener = (update: ControlListenerUpdate) => {
    const { classList } = this.bodyElement;
    const toggle = this.headerElement.querySelector('a') as HTMLAnchorElement;
    if (update.value === true) {
      if (!classList.contains(Base.hidden)) {
        classList.add(Base.hidden);
      }
      toggle.innerHTML = '&#9656;';
    } else {
      if (classList.contains(Base.hidden)) {
        classList.remove(Base.hidden);
      }
      toggle.innerHTML = '&#9662;';
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
