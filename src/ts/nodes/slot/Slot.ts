import { ParentNode, AnyControl } from '../parent/ParentNode';
import {
  InternalState,
  Listener,
  ControlOptions,
  ConfigControlNode,
  SlotOptions,
  SlotConfig,
} from '../../types';
import { Control } from '../../controls/control/Control';

import Base from '../../../sass/base.sass';
import Styles from '../../../sass/slot.sass';
import { SectionNode } from '../section/Section';

export type SlotProps = {
  id: string,
  options: SlotOptions,
  parentElement: HTMLElement,
  panelListener?: Listener,
};

export class SlotNode extends ParentNode {
  public headerElement: HTMLElement;
  public bodyElement: HTMLElement;
  public contentElement: HTMLElement;
  public readonly displayType: string = 'slot';

  protected static template = (state: InternalState): string => `<header
      class="${Styles.slot__header}"
    >
      <p class="${Styles.slot__name}">
        ${state.name}
      </p>
      <a class="${Styles.slot__link}">
        ${state.collapsed ? '&#9662;' : '&#9656;'}
      </a>
    </header>
    <main class="${Styles.slot__body}">
      <div class="${Styles.slot__content} ${state.collapsed ? Base.hidden : ''}"></div>
    </main>
  `;

  constructor(props: SlotProps) {
    super({
      ...props,
      template: SlotNode.template,
    });
    if (props.options.listener) {
      this.listeners.set('slot', props.options.listener);
    }
    if (props.panelListener) {
      this.listeners.set('panel', props.panelListener);
    }
    this.fillInElement(Styles.slot);
    this.headerElement = this.element.querySelector(`.${Styles.slot__header}`) as HTMLElement;
    this.bodyElement = this.element.querySelector(`.${Styles.slot__body}`) as HTMLElement;
    this.contentElement = this.element.querySelector(`.${Styles.slot__content}`) as HTMLElement;
    this.bindEventListeners();
    if (!props.options.collapsed) {
      this.setBodyPosition();
    }
  }

  control(
    control: string,
    options: ControlOptions,
  ) {
    return this.createControl(
      control,
      options,
      this.listeners.get('slot'),
      this.listeners.get('panel'),
      this.contentElement,
    );
  }

  set config(config: SlotConfig) {
    Object
      .values(config)
      .forEach((opts: ConfigControlNode) => {
        // @ts-ignore
        this.control(opts.displayType, opts);
      });
  }

  get config(): SlotConfig {
    return Object.fromEntries(
      Array.from(this.registry.entries())
        .map((entry: [string, SlotNode | SectionNode | AnyControl]) => {
          const control: Control = entry[1] as Control;
          const configNode: ConfigControlNode = {
            displayType: control.displayType,
            ...control.properties,
          };
          return [
            entry[0],
            configNode,
          ];
        }),
    );
  }

  find(name: string): AnyControl | undefined {
    return Array.from(this.registry.values())
      .find(
        (node: AnyControl | SlotNode | SectionNode) => node.name === name
      ) as AnyControl | undefined;
  }

  findById(id: string): AnyControl | undefined {
    return this.registry.get(id) as AnyControl | undefined;
  }

  remove(name: string) {
    this.registry.forEach((value: SlotNode | SectionNode | AnyControl) => {
      if (value.name === name) {
        const toRemove = value.element;
        this.contentElement.removeChild(toRemove);
        this.registry.delete(value.id);
      };
    });
  }

  removeById(id: string) {
    const toRemove = this.registry.get(id);
    if (toRemove) {
      this.contentElement.removeChild(toRemove.element);
      this.registry.delete(id);
    }
  }

  removeAll() {
    while (this.contentElement.firstChild) {
      this.contentElement.removeChild(
        this.contentElement.firstChild,
      );
    }
    this.registry.clear();
  }

  setListener(listener: Listener) {
    this.listeners.set('slot', listener);
  }

  private onHeaderClick = (event: Event) => {
    event.preventDefault();
    if (this.state.collapsed === true) {
      this.open();
      this.setBodyPosition();
    } else {
      this.close();
    }
  }

  private bindEventListeners() {
    this.headerElement.addEventListener('click', this.onHeaderClick);
  }

  private setBodyPosition() {
    const { bodyElement, contentElement } = this;
    const bodyWidth: number = contentElement.clientWidth;
    const { left } = SlotNode.offset(bodyElement);
    const right: number = document.documentElement.clientWidth - (left + bodyWidth);

    if (right > bodyWidth && left > bodyWidth) {
      contentElement.style.top = '-20px';
      contentElement.style.left = '100%';
    } else {
      if (left > bodyWidth) {
        contentElement.style.top = '-20px';
        contentElement.style.left = '100%';
      } else {
        if (right > bodyWidth) {
          contentElement.style.top = '-20px';
          contentElement.style.left = '-100%';
        } else {
          contentElement.style.top = '0px';
          contentElement.style.left = '0px';
        }
      }
    }
  }

  private static offset(element: HTMLElement): { [key: string]: number } {
    const rect: DOMRect = element.getBoundingClientRect();
    const scrollLeft: number = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop: number = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft,
    };
  }
}
