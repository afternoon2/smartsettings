import pkg from '../../../../package.json';
import cuid from 'cuid';

import { ParentNode, AnyControl } from '../parent/ParentNode';
import {
  InternalState,
  PanelOptions,
  SectionOptions,
  PanelPosition,
  Listener,
  ListenerUpdate,
  ControlOptions
} from '../../types';
import { SectionNode } from '../section/Section';

import Base from '../../../sass/base.sass';
import Styles from '../../../sass/panel.sass';

export class PanelNode extends ParentNode {
  public bodyElement: HTMLElement;
  public headerElement: HTMLElement;
  public readonly version: string = pkg.version;

  private toggleElement: HTMLAnchorElement;
  private nameElement: HTMLParagraphElement;

  protected static template = (state: InternalState): string => `<header
      class="${Styles.panel__header}"
      ${state.draggable ? 'draggable="true"' : ''}
    >
      <p class="${Styles.panel__name}" title="${state.name}">
        ${state.name}
      </p>
      <a class="${Styles.panel__link}">
        ${state.collapsed ? '&#9662;' : '&#9656;'}
      </a>
    </header>
    <main class="${Styles.panel__body} ${state.collapsed ? Base.hidden : ''}">
    </main>`;

  constructor(options?: PanelOptions) {
    super({
      id: cuid(),
      options: options || {
        name: `SmartSettings v. ${pkg.version}`,
        collapsed: false,
        disabled: false,
        draggable: false,
        invisible: false,
        top: 10,
        left: 10,
      },
      parentElement: document.body,
      template: PanelNode.template,
    });

    this.fillInElement(Styles.panel);
    this.headerElement = this.element.querySelector(`.${Styles.panel__header}`) as HTMLElement;
    this.nameElement = this.headerElement.querySelector('p') as HTMLParagraphElement;
    this.toggleElement = this.headerElement.querySelector('a') as HTMLAnchorElement;
    this.bodyElement = this.element.querySelector(`.${Styles.panel__body}`) as HTMLElement;
    this.listeners.set('top', this.onPositionChanged);
    this.listeners.set('left', this.onPositionChanged);
    if (options && options.listener) {
      this.listeners.set('panel', options.listener);
    }
    if (options && options.left && options.top) {
      this.state.top = options.top;
      this.state.left = options.left;
    }
    this.bindEventListeners();
  }

  get position(): PanelPosition | null {
    return this.state.top && this.state.left ?
      {
        top: this.state.top as number,
        left: this.state.left as number,
      } :
      null;
  }

  setPosition(position: PanelPosition) {
    this.state.top = position.top;
    this.state.left = position.left;
  }

  setListener(listener: Listener) {
    this.listeners.set('panel', listener);
  }

  destroy() {
    this.registry.clear();
    this.listeners.clear();
    this.parentElement.removeChild(this.element);
    Object.freeze(this.state);
    Object.freeze(this);
  }

  remove(name: string) {
    const toRemove = Array.from(this.registry.values())
      .find((el: AnyControl | SectionNode) => el.name === name);
    if (!toRemove) {
      this.registry.forEach((value: AnyControl | SectionNode) => {
        if (value instanceof SectionNode) {
          value.remove(name);
        };
      });
    } else {
      this.bodyElement.removeChild(toRemove.element);
      this.registry.delete(toRemove.id);
    }
  }

  removeById(id: string) {
    const localElement = this.registry.get(id);
    if (localElement) {
      this.bodyElement.removeChild(localElement.element);
      this.registry.delete(id);
    } else {
      this.registry.forEach((value: AnyControl | SectionNode) => {
        if (value instanceof SectionNode) {
          value.removeById(id);
        }
      })
    }
  }

  removeAll() {
    while (this.bodyElement.firstChild) {
      this.bodyElement.removeChild(
        this.bodyElement.firstChild,
      );
    }
    this.registry.clear();
  }

  control(
    control: string,
    options: ControlOptions,
  ): AnyControl | null {
    return this.createControl(
      control,
      options,
      undefined,
      this.listeners.get('panel'),
    );
  }

  section( 
    options: SectionOptions,
  ): SectionNode {
    const id: string = cuid();
    const section = new SectionNode({
      id,
      options,
      parentElement: this.bodyElement,
      panelListener: this.listeners.get('panel'),
    });
    this.registry.set(id, section);
    return section;
  }

  private bindEventListeners() {
    this.toggleElement.addEventListener('click', this.toggleClickListener);
    this.nameElement.addEventListener('click', this.toggleClickListener);
  }

  private toggleClickListener = (event: Event) => {
    event.preventDefault();
    if (this.state.collapsed === true) {
      this.open();
    } else {
      this.close();
    }
  }

  private onPositionChanged: Listener = (update: ListenerUpdate) => {
    const cssProp: string = update.key;
    // @ts-ignore
    this.element.style[cssProp] = `${update.value}px`;
  }
}