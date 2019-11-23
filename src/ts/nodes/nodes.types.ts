import { PanelPropsType, ControlListener } from '../controls/control/Control.types';

export type SectionOptions = {
  collapsed?: boolean,
  disabled?: boolean,
  invisible?: boolean,
};

export type SectionProps = PanelPropsType<SectionOptions> & {
  panelListener?: ControlListener,
};

export type PanelOptions = SectionOptions & {
  draggable?: boolean,
  top?: number,
  left?: number,
};

export type PanelPosition = {
  top: number,
  left: number,
};

export type PanelProps = PanelPropsType<PanelOptions>;

export type ParentOptions = SectionOptions | PanelOptions;

export type ParentProps = PanelProps | SectionProps;
