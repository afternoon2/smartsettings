import '@simonwep/pickr/dist/themes/nano.min.css';
import Pickr from '@simonwep/pickr';

import { Control } from '../control/Control';
import { ColorControlOptions, InternalState, Listener, ListenerUpdate } from '../../types';

import Base from '../../../sass/base.sass';
import Styles from '../../../sass/color.sass';
import cuid from 'cuid';

export type ColorControlProps = {
  id: string,
  options: ColorControlOptions,
  parentElement: HTMLElement,
  sectionListener?: Listener,
  panelListener?: Listener,
};

export class ColorControl extends Control {
  public controlElement: HTMLElement;
  public readonly displayType = 'color';

  protected static template = (state: InternalState): string => {
    const containerId: string = cuid();
    const swatchId: string = cuid();
    return `<div
        id="${containerId}"
        class="${Styles.color} ${state.disabled ? Base.disabled : ''}"
      >
        <a class="${Styles.color__swatch}" id="${swatchId}" style="background-color: ${state.value || '#1fd2ff'}">
          <span>
            ${state.value || '#1fd2ff'}
          </span>
        </a>
      </div>
    `;
  };

  private swatchElement: HTMLAnchorElement;
  private picker: Pickr;
  private rgbaRegexp: RegExp = /^rgba\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d*(?:\.\d+)?)\)$/;

  constructor(props: ColorControlProps) {
    super({
      ...props,
      template: ColorControl.template,
    });
    this.controlElement = this.element.querySelector(`.${Styles.color}`) as HTMLElement;
    this.swatchElement = this.element.querySelector(`.${Styles.color__swatch}`) as HTMLAnchorElement;
    this.picker = Pickr.create({
      el: `#${this.swatchElement.getAttribute('id')}`,
      container: `#${this.controlElement.getAttribute('id')}`,
      appClass: Styles.color__value,
      theme: 'nano',
      useAsButton: true,
      components: {
        preview: true,
        opacity: true,
        hue: true,
        interaction: {
          rgba: true,
          input: true,
        },
      },
      padding: 3,
      disabled: this.state.disabled,
      default: this.state.value as string || '#1fd2ff',
    });
    if (this.state.expanded) {
      this.picker.show();
    }
    this.listeners.set('value', this.onValue);
    this.listeners.set('expanded', this.onExpanded);
    this.bindActionListeners();
  }

  set color(color: string) {
    if (this.rgbaRegexp.test(color)) {
      this.state.value = color;
    }
  }

  get color(): string {
    return this.state.value as string;
  }

  get expanded(): boolean {
    return Boolean(this.state.expanded);
  }

  toggle() {
    this.state.expanded = !this.state.expanded;
  }

  private onValue: Listener = (update: ListenerUpdate) => {
    this.swatchElement.style.backgroundColor = update.value as string;
    (this.swatchElement.querySelector('span') as HTMLSpanElement).innerText = update.value as string;
    const selectedColor: string = this.picker.getSelectedColor().toString();
    if (update.value !== selectedColor) {
      this.picker.setColor(update.value as string);
    } 
  }

  private onExpanded: Listener = (update: ListenerUpdate) => {
    if (update.value === true) {
      this.picker.show();
    } else {
      this.picker.hide();
    }
  }

  private bindActionListeners() {
    this.picker
      .on('show', () => {
        if (this.state.expanded !== true) {
          this.state.expanded = true;
        }
      })
      .on('hide', () => {
        if (this.state.expanded !== false) {
          this.state.expanded = false;
        }
      })
      .on('change', (color: Pickr.HSVaColor) => {
        // @ts-ignore
        this.state.value = color.toRGBA().toString(0);
      });
  }
}
