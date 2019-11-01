import { html } from 'lighterhtml';
import { PanelOptions } from '../panel/panel.types';

export function isValidElement(parent: HTMLElement | string): boolean {
  if (typeof parent === 'string') {
    return Boolean(document.querySelector(parent));
  }
  if (parent instanceof HTMLElement && document.body.contains(parent)) {
    return true;
  }
  return false;
}

export function getParentElement(parent: HTMLElement | string): HTMLElement {
  if (parent instanceof HTMLElement) {
    return parent;
  }
  return <HTMLElement>document.querySelector(parent);
}

export function createPanelNode(
  title: string,
  id: string,
  options: PanelOptions = {},
): HTMLDivElement {
  const rootNode: HTMLDivElement = document.createElement('div');
  rootNode.classList.add('panel');
  if (options.locked) {
    rootNode.classList.add('locked');
  }
  if (options.invisible) {
    rootNode.classList.add('hidden');
  }
  rootNode.setAttribute('id', id);
  const template: HTMLElement = html`
    <header class="panel__header">
      <a class="panel__dragLink ${options.draggable ? '' : 'hidden'}">
        ✣
      </a>
      <p class="panel__title" title="${title}">
        ${title}
      </p>
      <a class="panel__collapseLink">
        ${options.collapsed ? '▷' : '▽'}
      </a>
    </header>
    <main class="panel__main${options.collapsed ? ' hidden' : ''}">
    </main>
  `;
  rootNode.appendChild(template);
  return rootNode;
}

