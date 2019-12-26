import { ParentNode, AnyControl } from '../parent/ParentNode';
import { 
  InternalState, 
  Listener, 
  ControlOptions, 
  SectionOptions, 
  SectionConfig,
  ConfigControlNode,
} from '../../types';
import { Control } from '../../controls/control/Control';

import Base from '../../../sass/base.sass';
import Styles from '../../../sass/section.sass';
import { SlotNode } from '../slot/Slot';

export type SectionProps = {
  id: string,
  options: SectionOptions,
  parentElement: HTMLElement,
  panelListener?: Listener,
};

export class SectionNode extends ParentNode {
  public headerElement: HTMLElement;
  public bodyElement: HTMLElement;
  public readonly displayType: string = 'section';

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
    super({
      ...props,
      template: SectionNode.template,
    });
    if (props.options.listener) {
      this.listeners.set('section', props.options.listener);
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
    options: ControlOptions,
  ) {
    return this.createControl(
      control,
      options,
      this.listeners.get('section'),
      this.listeners.get('panel'),
    );
  }

  set config(config: SectionConfig) {
    Object
      .values(config)
      .forEach((opts: ConfigControlNode) => {
        // @ts-ignore
        this.control(opts.displayType, opts);
      });
  }

  get config(): SectionConfig {
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
        this.bodyElement.removeChild(toRemove);
        this.registry.delete(value.id);
      };
    });
  }

  removeById(id: string) {
    const toRemove = this.registry.get(id);
    if (toRemove) {
      this.bodyElement.removeChild(toRemove.element);
      this.registry.delete(id);
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

  setListener(listener: Listener) {
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