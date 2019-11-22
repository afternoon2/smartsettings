import { PanelOptions } from '../nodes/nodes.types';
import {
  ControlOptions,
  ControlListener,
  ControlListenerUpdate,
} from '../controls/control/Control.types';

import Base from '../../sass/base.sass';

export type InternalState = (PanelOptions | ControlOptions) & {
  [key: string]: string | boolean | number | EventListener | null,
  readonly id: string,
  name: string,
};

export type InternalStateSetter = (
  target: InternalState,
  key: string,
  value: string | boolean | number,
) => boolean;

export abstract class RootNode {
  public abstract parentElement: HTMLElement;
  public abstract element: HTMLElement;
  
  protected abstract state: InternalState;
  protected abstract listeners: Map<string, ControlListener>;

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

  setListener(listener: ControlListener) {
    this.listeners.set('user', listener);
  }

  protected onInvisible: ControlListener = (update: ControlListenerUpdate) => {
    if (update.value === true) {
      if (!this.element.classList.contains(Base.hidden)) {
        this.element.classList.add(Base.hidden);
      }
    } else {
      if (this.element.classList.contains(Base.hidden)) {
        this.element.classList.remove(Base.hidden);
      }
    }
  }

  protected onDisabled: ControlListener = (update: ControlListenerUpdate) => {
    const controlElements = Array.from(this.element.querySelectorAll('input, button, select'));
    const setDisabled = (element: Element, disabled: boolean) =>
      disabled === true ?
        element.setAttribute('disabled', 'true') :
        element.removeAttribute('disabled');
    const setDisabledAttrTo = (disabled: boolean) => controlElements
      .forEach((el: Element) => setDisabled(el, disabled));
    const hasDisabledElements = () => controlElements.find((el: Element) =>
      el.getAttribute('disabled') === 'true',
    );
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
  }

  protected isParentValid(parent: HTMLElement | string | null): boolean {
    if (typeof parent === 'string') {
      return Boolean(document.querySelector(parent));
    } else if (parent instanceof HTMLElement && document.body.contains(parent)) {
      return true;
    }
    return false;
  }

  protected getParentElement(parent: HTMLElement | string): HTMLElement | null {
    if (parent instanceof HTMLElement) {
      return parent;
    }
    return document.querySelector(parent);
  }

  protected createState(
    id: string,
    name: string,
    options: ControlOptions | PanelOptions,
    handler: ProxyHandler<InternalState>,
  ): InternalState {
    const target: InternalState = {
      ...options, id, name,
    } as PanelOptions & InternalState;
    return new Proxy(target, handler);
  }

  protected createStateSetter(): InternalStateSetter {
    return (target: InternalState, key: string, value: string | boolean | number) => {
      target[key] = value;
      const userListener = this.listeners.get('user');
      const builtInListener = this.listeners.get(key);
      const update: ControlListenerUpdate = {
        id: target.id,
        key,
        value,
      };
      if (builtInListener) {
        builtInListener(update);
      }
      if (userListener) {
        userListener(update);
      }
      return true;
    };
  }

  protected checkParentElement(parent?: HTMLElement | string | null) {
    if (parent && this.isParentValid(parent)) {
      this.parentElement = <HTMLElement>this.getParentElement(parent);
    }
  }
}