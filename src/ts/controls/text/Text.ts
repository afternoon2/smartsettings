import { Control } from '../control/Control';
import {
  ControlListener, ControlListenerUpdate, TextControlProps,
} from '../control/Control.types';
import { InternalState } from '../../root/RootNode';

import Styles from '../../../sass/text.sass';

export class Text extends Control {
  public controlElement: HTMLInputElement;

  protected static template = (state: InternalState): string => `
    <input
      type="text"
      class="${Styles.text}"
      ${state.disabled ? 'disabled' : ''}
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
    this.listeners.set('value', this.onValue);
    this.bindActionListeners();
  }

  private onValue: ControlListener = (update: ControlListenerUpdate) => {
    this.controlElement.value = update.value as string;
  }

  private bindActionListeners = () => {
    this.controlElement.addEventListener('input', (e: Event) => {
      this.value = (e.target as HTMLInputElement).value;
    });
  }
}
