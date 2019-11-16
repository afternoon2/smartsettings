import { Control } from '../control/Control';
import {
  ButtonControlProps, ControlListener,
} from '../control/Control.types';
import { InternalState } from '../../root/RootNode';

import Styles from '../../../sass/button.sass';

export class ButtonControl extends Control {
  public controlElement: HTMLButtonElement;

  protected static defaultType: string = 'button';

  protected static template = (state: InternalState): string => `
    <button
      class="${Styles.button}"
      type="${state.type || ButtonControl.defaultType}"
      title="${state.name}"
      ${state.disabled ? 'disabled="true"' : ''}
    >
      ${state.text || ''}
    </button>
  `;

  private clickHandler?: ControlListener;

  constructor(props: ButtonControlProps) {
    super(props, ButtonControl.template);
    this.controlElement = this.element.querySelector('button') as HTMLButtonElement;
    if (props.userListener) {
      this.clickHandler = props.userListener;
    }
    this.bindActionListeners();
  }

  private bindActionListeners() {
    if (this.clickHandler) {
      this.controlElement.addEventListener('click', () => {
        (this.clickHandler as ControlListener)({
          id: this.state.id,
          key: '',
          value: '',
        });
      });
    }
  }
}