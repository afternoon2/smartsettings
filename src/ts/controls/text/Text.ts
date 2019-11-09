import { Control } from '../control/Control';
import {
  ControlListener, ControlListenerUpdate, TextControlProps,
} from '../control/Control.types';
import { InternalState } from '../../root/RootNode';

import Styles from '../../../sass/text.sass';
import Base from '../../../sass/base.sass';

export class Text extends Control {
  public controlElement: HTMLInputElement;

  protected static template = (state: InternalState): string => `
    <input
      type="text"
      class="${Styles.text}" ${state.disabled ? 'disabled' : ''}
      ${state.value ? `value="${state.value}"` : ''}
      ${state.autocomplete ? 'autocomplete="true"' : ''}
      ${state.minLength ? `min-length="${state.minLength}"` : ''}
      ${state.maxLength ? `min-length="${state.maxLength}"` : ''}
      ${state.placeholder ? `placeholder="${state.placeholder}"` : ''}
      ${state.pattern ? `pattern="${state.pattern}"` : ''}
      ${state.readOnly ? `readonly` : ''}
    />
  `;

  constructor(props: TextControlProps) {
    super(props, Text.template);
    this.controlElement = this.element.querySelector('[type="text"]') as HTMLInputElement;
    this.listeners.set('disabled', this.onDisabled);
    this.listeners.set('value', this.onValue);
    this.bindActionListeners();
  }

  set value(value: string) {
    this.state.value = value;
  }

  get value(): string {
    return this.state.value as string;
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
