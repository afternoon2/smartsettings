import cuid from 'cuid';

import { Control } from '../control/Control';
import { InternalState, Listener, ListenerUpdate, FileControlOptions } from '../../types';

import Styles from '../../../sass/file.sass';

export type FileControlProps = {
  id: string,
  options: FileControlOptions,
  parentElement: HTMLElement,
  sectionListener?: Listener,
  panelListener?: Listener,
};

export class FileControl extends Control {
  public controlElement: HTMLInputElement;

  protected static template = (state: InternalState): string => {
    const id: string = cuid();
    return `<label
        class="${Styles.file}"
        for="${id}"
      >
        Upload...
        <input
          id="${id}"
          type="file"
          title="${state.name}"
          ${state.disabled ? 'disabled' : ''}
          ${state.readonly ? 'readonly="true"' : ''}
        />
      </label>
    `
  };

  constructor(props: FileControlProps) {
    super({
      ...props,
      template: FileControl.template,
    });
    this.controlElement = this.element.querySelector('[type="file"]') as HTMLInputElement;
    this.listeners.set('accept', this.onAcceptChange);
    this.bindActionListeners();
  }

  get accept(): string {
    return this.state.accept as string;
  }

  set accept(accept: string) {
    this.state.accept = accept;
  }

  get files(): FileList | null {
    return this.state.files as FileList;
  }

  private onAcceptChange: Listener = (update: ListenerUpdate) => {
    this.controlElement.setAttribute('accept', update.value as string);
  }

  private bindActionListeners() {
    this.controlElement.addEventListener('change', (event: Event) => {
      this.state.files = ((event as Event).target as HTMLInputElement).files as FileList;
    });
  }
}
