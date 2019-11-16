import { Control } from '../control/Control';
import {
  NumberControlProps, ControlListener, ControlListenerUpdate,
} from '../control/Control.types';
import { InternalState } from '../../root/RootNode';

import Styles from '../../../sass/number.sass';

export class Number extends Control {
  public controlElement: HTMLInputElement;

  protected static template = (state: InternalState): string => `<input
      type="number"
      class="${Styles.number}"
      ${state.value ? `value="${state.value}"` : ''}
      ${state.min ? `min="${state.min}"` : ''}
      ${state.max ? `max="${state.max}"` : ''}
      ${state.step ? `step="${state.step}"` : ''}
      ${state.readonly ? 'readonly' : ''}
      ${state.disabled ? 'disabled' : ''}
      ${state.placeholder ? `placeholder="${state.placeholder}"` : ''}
    />
  `;

  constructor(props: NumberControlProps) {
    super(props, Number.template);
    this.controlElement = this.element.querySelector('[type="number"]') as HTMLInputElement;
    this.listeners.set('value', this.onValue);
    this.bindActionListeners();
  }

  set value(value: number) {
    this.state.value = value;
  }

  get value(): number {
    return this.state.value as number;
  }

  private onValue: ControlListener = (update: ControlListenerUpdate) => {
    this.controlElement.value = update.value as string;
  }

  private bindActionListeners = () => {
    this.controlElement.addEventListener('change', (e: Event) => {
      this.value = parseFloat((e.target as HTMLInputElement).value);
    });
  }
}