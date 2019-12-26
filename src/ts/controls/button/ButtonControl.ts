import { Control } from '../control/Control';
import { InternalState, ButtonControlOptions, Listener } from '../../types';

import Styles from '../../../sass/button.sass';

export type ButtonControlProps = {
  id: string,
  options: ButtonControlOptions,
  parentElement: HTMLElement,
  sectionListener?: Listener,
  panelListener?: Listener,
};

export class ButtonControl extends Control {
  public controlElement: HTMLButtonElement;
  public readonly displayType = 'button';

  protected static defaultType: string = 'button';

  protected static template = (state: InternalState): string => `
    <button
      class="${Styles.button}"
      type="${state.type || ButtonControl.defaultType}"
      title="${state.name}"
      ${state.disabled ? 'disabled="true"' : ''}
    >
      ${state.name || ''}
    </button>
  `;

  private controlListener?: Listener;
  private sectionListener?: Listener;
  private panelListener?: Listener;

  constructor(props: ButtonControlProps) {
    super({
      ...props,
      template: ButtonControl.template,
    });
    this.sectionListener = props.sectionListener;
    this.panelListener = props.panelListener;
    this.controlElement = this.element.querySelector('button') as HTMLButtonElement;
    this.controlListener = props.options.listener;
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
