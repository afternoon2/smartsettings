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
  public readonly displayType = 'dropdown';

  private static itemsTemplate = (items: DropDownItem[], state: InternalState): string => {
    const name: string = cuid();
    return items.map((item: DropDownItem) => {
      return `<li class="${Styles['dropdown__list-item']}">
          <label
            class="${Styles.dropdown__label}"
            for="${item.id}"
          >
            <span>${item.text}</span>
            <input
              id="${item.id}"
              name="${name}"
              class="${Styles.dropdown__radio}"
              type="${state.multiple === true ? 'checkbox' : 'radio'}"
              value="${item.value}"
            />
          </label>
        </li>
      `;
    }).join('')
  }

  protected static template = (state: InternalState): string => {
    const buttonId: string = cuid();
    const items = state.items as DropDownItem[];
    const getSelectedText = (): string => {
      const selected = items.find((item: DropDownItem) => item.value === state.selected);
      return selected ? selected.text : 'Select item';
    };
    return `<div
      id="${state.id}"
      class="${Styles.dropdown}"
    >
      <button
        id="${buttonId}"
        class="${Styles.dropdown__button}"
        ${state.disabled === true ? 'disabled' : ''}
      >
        <span>
          ${getSelectedText()}
        </span>
        <span class="${Styles.dropdown__toggle}">&#9662;</span>
      </button>
      <ul class="${Styles.dropdown__list} ${state.expanded === true ? '' : Base.hidden}">
        ${state.items ? DropDownControl.itemsTemplate(items, state) : ''}
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
    this.listeners.set('items', this.onItemsChanged);
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

  setItems(items: DropDownItem[]) {
    this.state.items = items;
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
    if (!this.state.multi) {
      this.onRadioSelected(update);
    }
  }

  private onRadioSelected: Listener = (update: ListenerUpdate) => {
    const newSelectedItem = (this.state.items as DropDownItem[]).find(
      (item: DropDownItem) => item.value === update.value,
    );
    if (newSelectedItem) {
      const { text } = newSelectedItem;
      (this.buttonElement.querySelector('span:first-child') as HTMLSpanElement)
        .innerHTML = text;
    }
  }

  private onItemsChanged: Listener = (update: ListenerUpdate) => {
    const self = this;
    const items = update.value as DropDownItem[];
    this.removeDOMItems();
    this.listElement.insertAdjacentHTML(
      'beforeend',
      DropDownControl.itemsTemplate(items, self.state),
    );
    this.listItems = this.listElement.querySelectorAll('li');
    this.bindItemsListener();
    this.select(items[0].value);
  }

  private removeDOMItems = () => {
    while (this.listElement.firstChild) {
      this.listElement.removeChild(
        this.listElement.firstChild,
      );
    }
  }

  private itemListener = (e: Event, item: HTMLLIElement) => {
    const input = item.querySelector('input') as HTMLInputElement;
    this.select(input.value);
  }

  private bindItemsListener = () => {
    this.listItems.forEach((listItem: HTMLLIElement) => {
      const input = listItem.querySelector('input') as HTMLInputElement;
      input.addEventListener('click', () => {
        this.state.expanded = false;
      });
      input.addEventListener('change', (e) =>
        this.itemListener(e, listItem)
      );
    });
  }

  private bindActionListeners() {
    this.buttonElement.addEventListener('click', () => {
      this.toggle();
    });
    this.bindItemsListener();
  }
}
