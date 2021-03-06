import { Control } from '../control/Control';
import { InternalState, Listener, ListenerUpdate, NumberControlOptions } from '../../types';

import Styles from '../../../sass/number.sass';

export type NumberControlProps = {
  id: string,
  options: NumberControlOptions,
  parentElement: HTMLElement,
  sectionListener?: Listener,
  panelListener?: Listener,
};

export class NumberControl extends Control {
  public controlElement: HTMLInputElement;
  public readonly displayType = 'number';

  protected static template = (state: InternalState): string => `<input
      type="number"
      class="${Styles.number}"
      ${state.value ? `value="${state.value}"` : ''}
      ${typeof state.min === 'number' ? `min="${state.min}"` : ''}
      ${typeof state.max === 'number' ? `max="${state.max}"` : ''}
      ${typeof state.step === 'number' ? `step="${state.step}"` : ''}
      ${state.readonly ? 'readonly="true"' : ''}
      ${state.disabled ? 'disabled' : ''}
      ${state.placeholder ? `placeholder="${state.placeholder}"` : ''}
    />
  `;

  constructor(props: NumberControlProps) {
    super({
      ...props,
      template: NumberControl.template,
    });
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

  private onValue: Listener = (update: ListenerUpdate) => {
    this.controlElement.value = update.value as string;
  }

  private bindActionListeners = () => {
    this.controlElement.addEventListener('change', (e: Event) => {
      this.value = parseFloat((e.target as HTMLInputElement).value);
    });
  }
}