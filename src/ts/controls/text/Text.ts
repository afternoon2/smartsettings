import { Control } from '../control/Control';
import {
  ControlListener, ControlListenerUpdate,
} from '../controls.types';
import { InternalState } from '../../root/RootNode';

import Styles from '../../../sass/text.sass';
import Base from '../../../sass/base.sass';

export type TextControlOptions = {
  value: string,
  autocomplete?: boolean,
  disabled?: boolean,
  maxLength?: number,
  pattern?: string,
  placeholder?: string,
  readOnly?: boolean,
};

export type TextControlProps = {
  id: string,
  name: string,
  options: TextControlOptions,
  parentElement: HTMLElement,
  userListener?: ControlListener,
};

export class Text extends Control {
  public parentElement: HTMLElement;
  public element: HTMLElement;
  public controlElement: HTMLInputElement;
  
  protected state: InternalState;
  protected listeners: Map<string, ControlListener> = new Map();
  protected template = (state: InternalState): string => `
    <input
      type="text"
      class="${Styles.text}" ${state.disabled ? 'disabled' : ''}
      ${this.state.value ? `value="${this.state.value}"` : ''}
      ${state.autocomplete ? 'autocomplete="true"' : ''}
      ${state.minLength ? `min-length="${state.minLength}"` : ''}
      ${state.maxLength ? `min-length="${state.maxLength}"` : ''}
      ${state.placeholder ? `placeholder="${state.placeholder}"` : ''}
      ${state.pattern ? `pattern="${state.pattern}"` : ''}
      ${state.readOnly ? `readonly` : ''}
    />
  `;

  private stateHandler: ProxyHandler<InternalState> = {
    set: this.createStateSetter(),
  }

  constructor(props: TextControlProps) {
    super();
    this.state = this.createState(
      props.id, props.name, props.options, this.stateHandler,
    );
    this.parentElement = props.parentElement;
    this.element = this.createControlElement(this.template(this.state), this.state.name, this.state.id);
    this.controlElement = this.element.querySelector('[type="text"]') as HTMLInputElement;
    this.parentElement.appendChild(this.element);

    if (props.userListener) {
      this.listeners.set('user', props.userListener);
    }
    this.listeners.set('disabled', this.onDisabled);
    this.listeners.set('value', this.onValue);
    this.bindActionListeners();
  }

  set value(value: string) {
    this.state.value = value;
  }

  get value(): string {
    return this.controlElement.value;
  }

  private onValue: ControlListener = (update: ControlListenerUpdate) => {
    this.controlElement.value = update.value as string;
  }

  private onDisabled: ControlListener = (update: ControlListenerUpdate) => {
    if (update.value === true) {
      if (!this.element.classList.contains(Base.disabled)) {
        this.element.classList.add(Base.disabled);
      }
      if (!this.controlElement.hasAttribute('disabled')) {
        this.element.setAttribute('disabled', 'true');
      }
    } else {
      if (this.element.classList.contains(Base.disabled)) {
        this.element.classList.remove(Base.disabled);
      }
      if (this.controlElement.hasAttribute('disabled')) {
        this.element.removeAttribute('disabled');
      }
    }
  }

  private bindActionListeners = () => {
    this.controlElement.addEventListener('input', (e: Event) => {
      this.value = (e.target as HTMLInputElement).value;
    });
  }
}
