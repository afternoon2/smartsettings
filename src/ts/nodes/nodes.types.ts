import { Props } from '../controls/control/Control.types';

export type SectionOptions = {
  collapsed?: boolean,
  disabled?: boolean,
  invisible?: boolean,
};

export type SectionProps = Props<SectionOptions>;

export type PanelOptions = SectionOptions & {
  draggable?: boolean,
  top?: number,
  left?: number,
};

export type PanelPosition = {
  top: number,
  left: number,
};

export type PanelProps = Props<PanelOptions>;

export type ParentOptions = SectionOptions | PanelOptions;

export type ParentProps = Props<ParentOptions>;
