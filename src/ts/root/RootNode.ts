import cuid from 'cuid';
import { PanelOptions } from '../panel/Panel';
import { ControlOptions, ControlListener } from '../controls/controls.types';

export abstract class RootNode {
  public id: string;
  public name: string;
  public listener: ControlListener | null;
  public options: PanelOptions | ControlOptions;

  constructor(
    name: string,
    options: PanelOptions | ControlOptions,
    listener: ControlListener | null,
    id: string | null,
  ) {
    const self = this;
    this.id = id || cuid();
    this.name = name;
    this.listener = listener;
    this.options = new Proxy(
      options,
      {
        set(
          // eslint-disable-next-line
          target: PanelOptions | ControlOptions,
          key: string,
          value: string | boolean | number,
        ) {
          if (self.listener) {
            self.listener({
              id: self.id,
              key,
              value,
            });
          }
          return true;
        }
      },
    ) as (PanelOptions | ControlOptions);
  }

  protected isValidElement(parent: HTMLElement | string | null): boolean {
    if (typeof parent === 'string') {
      return Boolean(document.querySelector(parent));
    }
    if (parent instanceof HTMLElement && document.body.contains(parent)) {
      return true;
    }
    return false;
  }

  protected getParentElement(parent: HTMLElement | string): HTMLElement {
    if (parent instanceof HTMLElement) {
      return parent;
    }
    return <HTMLElement>document.querySelector(parent);
  }
}