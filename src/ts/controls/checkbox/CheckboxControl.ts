import cuid from 'cuid';

import { Control } from '../control/Control';
import { InternalState, Listener, ListenerUpdate, CheckboxControlOptions } from '../../types';

import Styles from '../../../sass/checkbox.sass';

export type CheckboxControlProps = {
  id: string,
  options: CheckboxControlOptions,
  parentElement: HTMLElement,
  sectionListener?: Listener,
  panelListener?: Listener,
};

export class CheckboxControl extends Control {
  public controlElement: HTMLInputElement;
  public readonly displayType = 'checkbox';

  protected static template = (state: InternalState): string => {
    const id: string = cuid();
    return `<label
      class="${Styles.checkbox}" for="${id}">
        <input
          id="${id}"
          type="checkbox"
          title="${state.name}"
          ${state.checked ? 'checked' : ''}
          ${state.disabled ? 'disabled' : ''}
          ${state.readonly ? 'readonly="true"' : ''}
        />
      </label>
    `;
  }

  constructor(props: CheckboxControlProps) {
    super({
      ...props,
      template: CheckboxControl.template,
    });
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

  private onCheck: Listener = (update: ListenerUpdate) => {
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
