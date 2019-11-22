import { Control } from '../control/Control';
import {
  RangeControlProps, ControlListener, ControlListenerUpdate,
} from '../control/Control.types';
import { InternalState } from '../../root/RootNode';

import Styles from '../../../sass/range.sass';
import ControlStyles from '../../../sass/control.sass';

export class RangeControl extends Control {
  public controlElement: HTMLInputElement;

  protected static template = (state: InternalState): string => `<input
      type="range"
      class="${Styles.range}"
      ${state.value && typeof state.value === 'number' ? `value="${state.value}"` : ''}
      ${typeof state.min === 'number' ? `min="${state.min}"` : ''}
      ${typeof state.max === 'number' ? `max="${state.max}"` : ''}
      ${typeof state.step === 'number' ? `step="${state.step}"` : ''}
      ${state.readonly ? 'readonly' : ''}
      ${state.disabled ? 'disabled' : ''}
    />
  `;

  constructor(props: RangeControlProps) {
    super(props, RangeControl.template);
    this.controlElement = this.element.querySelector('[type="range"]') as HTMLInputElement;
    this.updateMain();
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
    (this.element.querySelector(`.${Styles.rangeValue}`) as HTMLSpanElement).textContent = update.value as string;
  }

  private bindActionListeners = () => {
    this.controlElement.addEventListener('input', (e: Event) => {
      this.value = parseFloat((e.target as HTMLInputElement).value);
    });
  }

  private updateMain = () => {
    const main = this.element.querySelector(`.${ControlStyles.control__content}`) as HTMLElement;
    main.classList.add(`${ControlStyles['control__content--range']}`);
    main.insertAdjacentHTML('beforeend', `<span class="${Styles.rangeValue}">
      ${typeof this.state.value === 'number' ? this.state.value : ''}
    </span>`);
  }
}