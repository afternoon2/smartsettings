import { Control } from '../control/Control';
import {
  ControlListener, ControlListenerUpdate, TextAreaControlProps,
} from '../control/Control.types';

import Styles from '../../../sass/textarea.sass';
import { InternalState } from '../../root/RootNode';

export class TextArea extends Control {
  public controlElement: HTMLTextAreaElement;

  protected static defaultRows: number = 8;
  protected static defaultCols: number = 10;

  protected static template = (state: InternalState): string => `
    <textarea
      wrap="hard"
      class="${Styles.textarea}"
      cols="${state.cols || TextArea.defaultCols}"
      rows="${state.rows || TextArea.defaultRows}"
      ${state.disabled ? 'disabled="true"' : ''}
      ${state.minLength ? `min-length="${state.minLength}"` : ''}
      ${state.maxLength ? `max-length="${state.maxLength}"` : ''}
      ${state.placeholder ? `placeholder="${state.placeholder}"` : ''}
      ${state.readonly ? 'readonly' : ''}
      ${state.autocomplete ? 'autocomplete="true"' : ''}
    >
      ${state.value}
    </textarea>
  `;

  constructor(props: TextAreaControlProps) {
    super(props, TextArea.template);
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

  private onValue: ControlListener = (update: ControlListenerUpdate) => {
    this.controlElement.value = update.value as string;
  }

  private bindActionListeners = () => {
    this.controlElement.addEventListener('input', (e: Event) => {
      this.value = (e.target as HTMLInputElement).value;
    });
  }
}
