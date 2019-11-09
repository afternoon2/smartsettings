import { RootNode, InternalState } from '../../root/RootNode';

import Styles from '../../../sass/control.sass';

export abstract class Control extends RootNode {
  public abstract controlElement: HTMLElement;
  protected abstract template(state: InternalState): string;

  protected createRootDiv(): HTMLDivElement {
    const element = document.createElement('div');
    element.classList.add(Styles.control);
    return element;
  }

  protected createControlElement(template: string, name: string, id: string): HTMLDivElement {
    const element = this.createRootDiv();
    const main = document.createElement('main');
    main.classList.add(Styles.control__body);
    main.setAttribute('id', id);
    main.insertAdjacentHTML(
      'beforeend',
      `<p class="${Styles.control__name}" title="${name}">${name}</p>`,
    );
    const content = document.createElement('div');
    content.classList.add(Styles.control__content);
    content.insertAdjacentHTML('beforeend', template);
    main.appendChild(content);
    element.appendChild(main);
    return element;
  }
}
