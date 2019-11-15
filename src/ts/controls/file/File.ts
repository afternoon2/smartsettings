import cuid from 'cuid';

import { Control } from '../control/Control';
import {
  FileControlProps, ControlListener, ControlListenerUpdate,
} from '../control/Control.types';
import { InternalState } from '../../root/RootNode';

import Styles from '../../../sass/file.sass';

export class File extends Control {
  public controlElement: HTMLInputElement;

  protected controlId: string = cuid();

  protected static template = (state: InternalState): string => `<label
      class="${Styles.file}"
      for="${state.controlId}"
    >
      Upload...
      <input
        id="${state.controlId}"
        type="file"
        title="${state.name}"
        ${state.disabled ? 'disabled' : ''}
        ${state.readonly ? 'readonly' : ''}
      />
    </label>
  `;

  constructor(props: FileControlProps) {
    super(props, File.template);
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

  private onAcceptChange: ControlListener = (update: ControlListenerUpdate) => {
    this.controlElement.setAttribute('accept', update.value as string);
  }

  private bindActionListeners() {
    this.controlElement.addEventListener('change', (event: Event) => {
      this.state.files = ((event as Event).target as HTMLInputElement).files as FileList;
    });
  }
}
