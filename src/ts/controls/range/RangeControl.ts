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
    this.listeners.set('min', this.onMinMaxStep);
    this.listeners.set('max', this.onMinMaxStep);
    this.listeners.set('step', this.onMinMaxStep);
    this.bindActionListeners();
  }

  set value(value: number) {
    this.state.value = value;
  }

  get value(): number {
    return this.state.value as number;
  }

  get min(): number {
    return this.state.min as number;
  }

  set min(min: number) {
    this.state.min = min;
  }

  get max(): number {
    return this.state.max as number;
  }

  set max(max: number) {
    this.state.max = max;
  }

  get step(): number {
    return this.state.step as number;
  }

  set step(step: number) {
    this.state.step = step;
  }

  private onValue: ControlListener = (update: ControlListenerUpdate) => {
    this.controlElement.value = update.value as string;
    (this.element.querySelector(`.${Styles.rangeValue}`) as HTMLSpanElement).textContent = update.value as string;
  }

  private onMinMaxStep: ControlListener = (update: ControlListenerUpdate) => {
    this.controlElement.setAttribute(update.key, `${update.value}`);
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