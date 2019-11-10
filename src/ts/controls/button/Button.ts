import { Control } from '../control/Control';
import {
  ButtonControlProps,
} from '../control/Control.types';
import { InternalState } from '../../root/RootNode';

import Styles from '../../../sass/button.sass';

export class Button extends Control {
  public controlElement: HTMLButtonElement;

  protected static defaultType: string = 'button';

  protected static template = (state: InternalState): string => `
    <button
      class="${Styles.button}"
      type="${state.type || Button.defaultType}"
      title="${state.name}"
      ${state.disabled ? 'disabled="true"' : ''}
    >
      ${state.text || ''}
    </button>
  `;

  constructor(props: ButtonControlProps) {
    super(props, Button.template);
    this.controlElement = this.element.querySelector('button') as HTMLButtonElement;
    this.bindActionListeners();
  }

  set onClick(onClickFunc: EventListener) {
    this.state.onClick = onClickFunc;
  }

  private bindActionListeners() {
    this.controlElement.addEventListener('click', (event: Event) => {
      (this.state.onClick as EventListener)(event);
    });
  }
}
