import cuid from 'cuid';

import { Control } from '../control/Control';
import { DropDownControlOptions, Listener, InternalState, DropDownItem, ListenerUpdate } from '../../types';

import Base from '../../../sass/base.sass';
import Styles from '../../../sass/dropdown.sass';

export type DropDownControlProps = {
  id: string,
  options: DropDownControlOptions,
  parentElement: HTMLElement,
  sectionListener?: Listener,
  panelListener?: Listener,
};

export class DropDownControl extends Control {
  public controlElement: HTMLDivElement;

  protected static template = (state: InternalState): string => {
    const buttonId: string = cuid();
    const name: string = cuid();
    const renderOptions = (items: DropDownItem[]) =>
      items.map((item: DropDownItem) => {
        return `<li class="${Styles['dropdown__list-item']}">
            <label
              class="${Styles.dropdown__label}"
              for="${item.id}"
            >
              <span>${item.text}</span>
              <input
                id="${item.id}"
                class="${Base.hidden}"
                name="${name}"
                type="${state.multiple === true ? 'checkbox' : 'radio'}"
                value="${item.value}" ${state.value === item.value ? 'checked' : ''}"
              />
            </label>
          </li>
        `;
      });
    return `<div
      id="${state.id}"
      class="${Styles.dropdown}"
    >
      <button
        id="${buttonId}"
        class="${Styles.dropdown__button}"
        ${state.disabled === true || typeof state.selected !== 'number' ? 'disabled' : ''}
      >
        <span>
          ${
            typeof state.selected === 'number' ?
              (state.items as DropDownItem[])[state.selected as number].text :
              'No value provided'
          }
        </span>
        <span class="${Styles.dropdown__toggle}">&#9662;</span>
      </button>
      <ul class="${Styles.dropdown__list} ${state.expanded === true ? '' : Base.hidden}">
        ${state.items ? renderOptions(state.items as DropDownItem[]).join('') : ''}
      </ul>
    </div>`;
  };

  private buttonElement: HTMLButtonElement;
  private listElement: HTMLUListElement;
  private listItems: NodeListOf<HTMLLIElement>;

  constructor(props: DropDownControlProps) {
    super({
      ...props,
      template: DropDownControl.template,
    });
    this.controlElement = this.element.querySelector(`.${Styles.dropdown}`) as HTMLDivElement;
    this.buttonElement = this.controlElement.querySelector(`.${Styles.dropdown__button}`) as HTMLButtonElement;
    this.listElement = this.controlElement.querySelector(`.${Styles.dropdown__list}`) as HTMLUListElement;
    this.listItems = this.listElement.querySelectorAll('li');
    this.bindAccessibilityAttributes();
    this.listeners.set('expanded', this.onExpanded);
    this.listeners.set('selected', this.onSelected);
    this.bindActionListeners();
  }

  toggle() {
    this.state.expanded = !this.state.expanded;
  }

  get expanded(): boolean {
    return Boolean(this.state.expanded);
  }

  get selected(): string {
    const items = this.state.items as DropDownItem[];
    const selected = items.find((item: DropDownItem) => item.value === this.state.selected);
    return (selected as DropDownItem).value;
  }

  select(value: string) {
    const item: DropDownItem | undefined = (this.state.items as DropDownItem[])
      .find((item: DropDownItem) => item.value === value);
    if (item) {
      this.state.selected = item.value;
    }
  }

  private bindAccessibilityAttributes() {
    const listItems = this.listElement.querySelectorAll('label');

    this.buttonElement.setAttribute('aria-haspopup', 'true');
    this.buttonElement.setAttribute('aria-expanded', `${Boolean(this.state.expanded)}`);
    this.buttonElement.setAttribute('data-toggle', 'dropdown');

    this.listElement.setAttribute('role', 'menu');
    listItems.forEach((listItem: HTMLLabelElement) => listItem.setAttribute('role', 'menuitem'));
  }

  private onExpanded: Listener = (update: ListenerUpdate) => {
    this.buttonElement.setAttribute('aria-expanded', `${update.value}`);
    const toggle = this.buttonElement.querySelector(`.${Styles.dropdown__toggle}`) as HTMLSpanElement;
    if (update.value === true) {
      if (this.listElement.classList.contains(Base.hidden)) {
        this.listElement.classList.remove(Base.hidden);
      }
      toggle.innerHTML = '&#9656;'
    } else {
      if (!this.listElement.classList.contains(Base.hidden)) {
        this.listElement.classList.add(Base.hidden);
      }
      toggle.innerHTML = '&#9662;';
    }
  }

  private onSelected: Listener = (update: ListenerUpdate) => {
    // const checkboxes = this.listElement.querySelectorAll('[type="checkbox"]');
    if (!this.state.multiple) {
      this.onRadioSelected(update);
    }
  }

  private onRadioSelected: Listener = (update: ListenerUpdate) => {
    const newSelectedItem = (this.state.items as DropDownItem[]).find(
      (item: DropDownItem, index: number) => index === update.value,
    );
    if (newSelectedItem) {
      const { id, text } = newSelectedItem;
      (this.listElement.querySelector(`#${id}`) as HTMLInputElement)
        .setAttribute('checked', 'true');
      (this.buttonElement.querySelector('span:first-child') as HTMLSpanElement)
        .innerHTML = text;
      this.state.expanded = false;
    }
  }

  private bindActionListeners() {
    this.buttonElement.addEventListener('click', () => {
      this.toggle();
    });
    this.listItems.forEach((item: HTMLLIElement) => item.addEventListener('click', (e: Event) => {
      const input = item.querySelector('input') as HTMLInputElement;
      this.select(input.value);
    }));
  }
}
