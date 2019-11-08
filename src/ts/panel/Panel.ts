import { RootNode } from '../root/RootNode';
import { ControlListener } from '../controls/controls.types';

import Base from '../../sass/base.sass';
import Styles from '../../sass/panel.sass';

export type PanelPosition = {
  left: number,
  top: number,
};

export type PanelOptions = {
  collapsed?: boolean,
  draggable?: boolean,
  locked?: boolean,
  invisible?: boolean,
  position?: PanelPosition,
};

export type PanelProps = {
  id: string,
  name: string,
  options: PanelOptions,
  parent: HTMLElement,
};

// export class Panel extends RootNode {
//   public parentElement: HTMLElement = document.body;
//   public element: HTMLDivElement;

//   constructor(props: PanelProps) {
//     super();
//     this.assignParentElement(parent);
//     this.element = this.createPanelNode();
//     this.parentElement.appendChild(this.element);
//   }

//   private assignParentElement(parent: HTMLElement | string | null) {
//     if (parent && this.isValidElement(parent)) {
//       this.parentElement = this.getParentElement(parent);
//     }
//   }

//   private createPanelNode(): HTMLDivElement {
//     const { locked, invisible, draggable, collapsed } = this.options as PanelOptions;
//     const { id, name } = this;
//     const rootNode: HTMLDivElement = document.createElement('div');
//     rootNode.classList.add(Styles.panel);
//     if (locked) {
//       rootNode.classList.add(Base.locked);
//     }
//     if (invisible) {
//       rootNode.classList.add(Base.hidden);
//     }
//     if (draggable) {
//       rootNode.setAttribute('data-draggable', "true");
//     }
//     rootNode.setAttribute('id', id);
//     const template: string = `
//       <header class="${Styles.panel__header}">
//         <p class="${Styles.panel__name}" title="${name}">
//           ${name}
//         </p>
//         <a class="${Styles.panel__link}">
//           ${collapsed ? ' &#9662;' : '&#9656'}
//         </a>
//       </header>
//       <main class="${Styles.panel__body} ${collapsed ? Base.hidden : ''}">
//       </main>
//     `;
//     rootNode.insertAdjacentHTML('beforeend', template);
//     return rootNode;
//   }
// }
