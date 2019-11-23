import { SectionProps } from '../nodes.types';
import { ParentNode } from '../parent/ParentNode';
import { InternalState } from '../../root/RootNode';

import Base from '../../../sass/base.sass';
import Styles from '../../../sass/section.sass';
import { ControlListener, ControlOptions } from '../../controls/control/Control.types';

export class SectionNode extends ParentNode {
  public headerElement: HTMLElement;
  public bodyElement: HTMLElement;

  protected static template = (state: InternalState): string => `<header
      class="${Styles.section__header}"
    >
      <p class="${Styles.section__name}">
        ${state.name}
      </p>
      <a class="${Styles.section__link}">
        ${state.collapsed ? '&#9662;' : '&#9656;'}
      </a>
    </header>
    <main class="${Styles.section__body} ${state.collapsed ? Base.hidden : ''}"></main>
  `;

  constructor(props: SectionProps) {
    super(props, SectionNode.template);
    if (props.listener) {
      this.listeners.set('section', props.listener);
    }
    if (props.panelListener) {
      this.listeners.set('panel', props.panelListener);
    }
    this.fillInElement(Styles.section);
    this.headerElement = this.element.querySelector(`.${Styles.section__header}`) as HTMLElement;
    this.bodyElement = this.element.querySelector(`.${Styles.section__body}`) as HTMLElement;
    this.bindEventListeners();
  }

  control(
    control: string,
    name: string,
    options: ControlOptions | null,
    listener?: ControlListener,
  ) {
    return this.createControl(
      control,
      name,
      options,
      {
        control: listener,
        section: this.listeners.get('section'),
        panel: this.listeners.get('panel'),
      }
    );
  }

  setListener(listener: ControlListener) {
    this.listeners.set('section', listener);
  }

  private onHeaderClick = (event: Event) => {
    event.preventDefault();
    if (this.state.collapsed === true) {
      this.open();
    } else {
      this.close();
    }
  }

  private bindEventListeners() {
    this.headerElement.addEventListener('click', this.onHeaderClick);
  }
}