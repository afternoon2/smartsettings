import { Control } from '../control/Control';
import { InternalState, TextAreaControlOptions, Listener, ListenerUpdate } from '../../types';

import Styles from '../../../sass/textarea.sass';

export type TextAreaControlProps = {
  id: string,
  options: TextAreaControlOptions,
  parentElement: HTMLElement,
  sectionListener?: Listener,
  panelListener?: Listener,
};

export class TextAreaControl extends Control {
  public controlElement: HTMLTextAreaElement;

  protected static defaultRows: number = 4;
  protected static defaultCols: number = 10;

  protected static template = (state: InternalState): string => `
    <textarea
      wrap="hard"
      class="${Styles.textarea}"
      cols="${state.cols || TextAreaControl.defaultCols}"
      rows="${state.rows || TextAreaControl.defaultRows}"
      ${state.disabled ? 'disabled="true"' : ''}
      ${state.minLength ? `min-length="${state.minLength}"` : ''}
      ${state.maxLength ? `max-length="${state.maxLength}"` : ''}
      ${state.placeholder ? `placeholder="${state.placeholder}"` : ''}
      ${state.readonly ? 'readonly="true"' : ''}
      ${state.autocomplete ? 'autocomplete="true"' : ''}
    >${state.value || ''}</textarea>
  `;

  constructor(props: TextAreaControlProps) {
    super({
      ...props,
      template: TextAreaControl.template
    });
    this.controlElement = this.element.querySelector('textarea') as HTMLTextAreaElement;
    this.listeners.set('value', this.onValue);
    this.bindActionListeners();
  }

  set value(value: string) {
    this.state.value = value;
  }

  get value(): string {
    return this.state.value as string;
  }

  private onValue: Listener = (update: ListenerUpdate) => {
    this.controlElement.value = update.value as string;
  }

  private bindActionListeners = () => {
    this.controlElement.addEventListener('input', (e: Event) => {
      this.value = (e.target as HTMLInputElement).value;
    });
  }
}
