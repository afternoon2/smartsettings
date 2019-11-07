import { RootNode } from '../../root/RootNode';

import Styles from '../../../sass/control.sass';

export abstract class Control extends RootNode {
  abstract controlElement: HTMLElement;
  protected abstract template: string;

  protected createRootDiv(): HTMLDivElement {
    const element = document.createElement('div');
    element.classList.add(Styles.control);
    return element;
  }

  protected withControlTemplate(template: string, name: string, id: string): string {
    return `
      <main class="${Styles.control__body}" id="${id}">
        <p class="${Styles.control__name}" title="${name}">
          ${name}
        </p>
      </main>
      <div class="${Styles.control__content}">
        ${template}
      </div>
  `;
  }

  protected createControlElement(template: string, name: string, id: string): HTMLDivElement {
    const completeTemplate = this.withControlTemplate(template, name, id);
    const element = this.createRootDiv();
    element.insertAdjacentHTML('beforeend', completeTemplate);
    return element;
  }
}
