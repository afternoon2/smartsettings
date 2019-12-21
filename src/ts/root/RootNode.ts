import { Omit } from 'utility-types';

import {
  PanelOptions,
  ControlOptions,
  Listener,
  ListenerUpdate,
  InternalState,
  InternalStateSetter,
} from '../types';

import Base from '../../sass/base.sass';

export abstract class RootNode {
  public abstract parentElement: HTMLElement;

  public abstract element: HTMLElement;

  public abstract readonly displayType: string;

  protected abstract state: InternalState;

  protected abstract listeners: Map<string, Listener>;

  abstract setListener(listener: Listener): void;

  get properties(): Omit<InternalState, 'id'> {
    const entries = Object.entries(this.state)
      .filter((entry: [string, any]) => entry[0] !== 'id');
    return Object.fromEntries(entries);
  }

  get id(): string {
    return this.state.id;
  }

  get name(): string {
    return this.state.name;
  }

  get invisible(): boolean {
    return Boolean(this.state.invisible);
  }

  get disabled(): boolean {
    return Boolean(this.state.disabled);
  }

  rename(name: string) {
    this.state.name = name;
  }

  show() {
    this.state.invisible = false;
  }

  hide() {
    this.state.invisible = true;
  }

  disable() {
    this.state.disabled = true;
  }

  enable() {
    this.state.disabled = false;
  }

  protected onInvisible: Listener = (update: ListenerUpdate) => {
    if (update.value === true) {
      if (!this.element.classList.contains(Base.hidden)) {
        this.element.classList.add(Base.hidden);
      }
    } else if (this.element.classList.contains(Base.hidden)) {
      this.element.classList.remove(Base.hidden);
    }
  };

  protected onDisabled: Listener = (update: ListenerUpdate) => {
    const controlElements = Array.from(this.element.querySelectorAll('input, button, select'));
    const setDisabled = (element: Element, disabled: boolean) => (disabled === true
      ? element.setAttribute('disabled', 'true')
      : element.removeAttribute('disabled'));
    const setDisabledAttrTo = (disabled: boolean) => controlElements
      .forEach((el: Element) => setDisabled(el, disabled));
    const hasDisabledElements = () => controlElements.find((el: Element) => el.getAttribute('disabled') === 'true');
    if (update.value === true) {
      if (!this.element.classList.contains(Base.disabled)) {
        this.element.classList.add(Base.disabled);
      }
      if (!hasDisabledElements()) {
        setDisabledAttrTo(true);
      }
    } else {
      if (this.element.classList.contains(Base.disabled)) {
        this.element.classList.remove(Base.disabled);
      }
      if (hasDisabledElements()) {
        setDisabledAttrTo(false);
      }
    }
  };

  protected static isParentValid(parent: HTMLElement | string | null): boolean {
    if (typeof parent === 'string') {
      return Boolean(document.querySelector(parent));
    } if (parent instanceof HTMLElement && document.body.contains(parent)) {
      return true;
    }
    return false;
  }

  protected static getParentElement(parent: HTMLElement | string): HTMLElement | null {
    if (parent instanceof HTMLElement) {
      return parent;
    }
    return document.querySelector(parent);
  }

  protected static createState(
    id: string,
    options: ControlOptions | PanelOptions,
    handler: ProxyHandler<InternalState>,
  ): InternalState {
    const copied: ControlOptions | PanelOptions = {
      ...options,
    };
    if (copied.listener) {
      delete copied.listener;
    }
    const target: InternalState = {
      ...copied, id,
    } as InternalState;
    return new Proxy(target, handler);
  }

  protected static createRootElement(template: string): HTMLElement {
    const rootElement = document.createElement('div');
    rootElement.insertAdjacentHTML('beforeend', template);
    return rootElement;
  }

  protected createStateSetter(): InternalStateSetter {
    return (
      target: InternalState,
      key: string,
      value: string | boolean | number,
    ) => {
      if (value !== target[key]) {
        target[key] = value;
      }
      const controlListener = this.listeners.get('control');
      const sectionListener = this.listeners.get('section');
      const panelListener = this.listeners.get('panel');
      const builtInListener = this.listeners.get(key);
      const update = {
        targetId: target.id,
        key,
        value,
      };
      if (builtInListener) {
        builtInListener({
          ...update,
          listenerType: 'builtin',
        });
      }
      if (controlListener) {
        controlListener({
          ...update,
          listenerType: 'control',
        });
      }
      if (sectionListener) {
        sectionListener({
          ...update,
          listenerType: 'section',
        });
      }
      if (panelListener) {
        panelListener({
          ...update,
          listenerType: 'panel',
        });
      }
      return true;
    };
  }

  protected checkParentElement(parent?: HTMLElement | string | null) {
    if (parent && RootNode.isParentValid(parent)) {
      this.parentElement = <HTMLElement> RootNode.getParentElement(parent);
    }
  }
}
