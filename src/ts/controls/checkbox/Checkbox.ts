import { Control } from '../control/Control';
import {
  CheckboxControlProps, ControlListener, ControlListenerUpdate,
} from '../control/Control.types';
import { InternalState } from '../../root/RootNode';

import Styles from '../../../sass/checkbox.sass';

export class Checkbox extends Control {
  public controlElement: HTMLInputElement;

  protected static template = (state: InternalState): string => `
    <input
      type="checkbox"
      title="${state.name}"
      class="${Styles.checkbox}"
      ${state.checked ? 'checked' : ''}
      ${state.disabled ? 'disabled' : ''}
      ${state.readonly ? 'readonly' : ''}
    />
  `;

  constructor(props: CheckboxControlProps) {
    super(props, Checkbox.template);
    this.controlElement = this.element.querySelector('[type="checkbox"]') as HTMLInputElement;
    this.listeners.set('checked', this.onCheck);
    this.bindActionListeners();
  }

  get checked(): boolean {
    return this.state.checked as boolean;
  }

  check() {
    this.state.checked = true;
  }

  uncheck() {
    this.state.checked = false;
  }

  toggle() {
    this.state.checked = !this.state.checked;
  }

  private onCheck: ControlListener = (update: ControlListenerUpdate) => {
    console.log(update.value);
    if (update.value === true) {
      this.controlElement.setAttribute('checked', 'true');
    } else {
      this.controlElement.removeAttribute('checked');
    }
  }

  private bindActionListeners() {
    this.controlElement.addEventListener('change', (event: Event) => {
      event.preventDefault();
      this.toggle();
    });
  }
}
