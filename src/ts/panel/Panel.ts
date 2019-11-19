import { RootNode, InternalState, InternalStateSetter } from '../root/RootNode';
import { ControlListener, ControlListenerUpdate } from '../controls/control/Control.types';

import Base from '../../sass/base.sass';
import Styles from '../../sass/panel.sass';

export type PanelPosition = {
  left: number,
  top: number,
};

export type PanelOptions = {
  collapsed?: boolean,
  draggable?: boolean,
  locked?: boolean,
  invisible?: boolean,
  position?: PanelPosition,
};

export type PanelProps = {
  id: string,
  name: string,
  options: PanelOptions,
  parent: HTMLElement,
  userListener?: ControlListener,
};

export class Panel extends RootNode {
  public parentElement: HTMLElement;
  public element: HTMLElement;

  protected state: InternalState;
  protected listeners: Map<string, ControlListener> = new Map();
  protected template = (state: InternalState): string => `<header
    class="${Styles.panel__header}">
      <p class="${Styles.panel__name}" title="${state.name}">
        ${state.name}
      </p>
      <a class="${Styles.panel__link}">
        ${state.collapsed ? ' &#9662;' : '&#9656'}
      </a>
    </header>
    <main class="${Styles.panel__body} ${state.collapsed ? Base.hidden : ''}">
    </main>`;

  private stateHandler: ProxyHandler<InternalState> = {
    set: this.createStateSetter(),
  }

  constructor(props: PanelProps) {
    super();
    this.state = this.createState(props.id, props.name, props.options, this.stateHandler);
    this.parentElement = props.parent;
    this.element = this.createPanelElement();
    
    this.parentElement.appendChild(this.element);

    this.listeners.set('invisible', this.onInvisible);
    this.listeners.set('disabled', this.onDisabled);
    this.listeners.set('collapsed', this.onCollapsed);
    if (props.userListener) {
      this.listeners.set('user', props.userListener);
    }
  }

  open() {
    this.state.collapsed = false;
  }

  close() {
    this.state.collapsed = true;
  }

  private createPanelElement = (): HTMLElement => {
    const { id, disabled, invisible, draggable } = this.state;
    const panelElement = document.createElement('div');
    if (disabled) {
      panelElement.classList.add(Base.locked);
    }
    if (invisible) {
      panelElement.classList.add(Base.hidden);
    }
    if (draggable) {
      panelElement.setAttribute('data-draggable', "true");
    }
    panelElement.setAttribute('id', id);
    const template: string = this.template(this.state);
    panelElement.insertAdjacentHTML('beforeend', template);
    return panelElement;
  }

  private onCollapsed: ControlListener = (update: ControlListenerUpdate) => {
    const panelBody = this.element.querySelector(`.${Styles.panel__body}`) as HTMLElement;
    const { classList } = panelBody;
    if (update.value === true) {
      if (!classList.contains(Base.hidden)) {
        classList.add(Base.hidden);
      }
    } else {
      if (classList.contains(Base.hidden)) {
        classList.remove(Base.hidden);
      }
    }
  }
}