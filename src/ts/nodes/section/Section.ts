import { SectionProps } from '../nodes.types';
import { ParentNode } from '../parent/ParentNode';
import { InternalState } from '../../root/RootNode';

import Base from '../../../sass/base.sass';
import Styles from '../../../sass/section.sass';

export class SectionNode extends ParentNode {
  public bodyElement: HTMLElement;

  protected static template = (state: InternalState): string => `<header
      class="${Styles.section__header}"
    >
      <p class="${Styles.section__name}">
        ${state.name}
      </p>
      <a class="${Styles.section__link}">
        ${state.collapsed ? '&#9656;' : '&#9662;'}
      </a>
    </header>
    <main class="${Styles.section__body} ${state.collapsed ? Base.hidden : ''}"></main>
  `;

  constructor(props: SectionProps) {
    super(props, SectionNode.template);
    this.fillInElement();
    this.bodyElement = this.element.querySelector(`.${Styles.section__body}`) as HTMLElement;
  }

  private fillInElement() {
    this.element.classList.add(Styles.section);
    this.onDisabled({
      id: this.id,
      key: 'disabled',
      value: this.state.disabled as boolean,
    });
  }
}