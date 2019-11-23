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

  private controlListener?: ControlListener;
  private sectionListener?: ControlListener;
  private panelListener?: ControlListener;

  constructor(props: ButtonControlProps) {
    super(props, ButtonControl.template);
    this.controlElement = this.element.querySelector('button') as HTMLButtonElement;
    this.controlListener = props.listener;
    this.sectionListener = props.sectionListener;
    this.panelListener = props.panelListener;
    this.bindActionListeners();
  }

  private bindActionListeners() {
    this.controlElement.addEventListener('click', () => {
      if (this.controlListener) {
        this.controlListener({
          targetId: this.state.id,
          key: '',
          value: '',
          listenerType: 'control'
        });
      }
      if (this.sectionListener) {
        this.sectionListener({
          targetId: this.state.id,
          key: '',
          value: '',
          listenerType: 'section',
        });
      }
      if (this.panelListener) {
        this.panelListener({
          targetId: this.state.id,
          key: '',
          value: '',
          listenerType: 'panel'
        });
      }
    });
  }
}
