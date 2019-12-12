import { Omit } from 'utility-types';

export type ListenerUpdate = {
  targetId: string,
  key: string,
  value: string | boolean | number | DropDownItem[] | DropDownItem,
  listenerType: 'control' | 'section' | 'panel' | 'builtin',
};

export type Listener = (update: ListenerUpdate) => void;

export type RootOptions = {
  name: string,
  invisible?: boolean,
  disabled?: boolean,
  listener?: Listener,
};

export type SectionOptions = RootOptions & {
  collapsed?: boolean;
};

export type SectionState = Omit<SectionOptions, 'listener'>;

export type PanelOptions = SectionOptions & {
  draggable?: boolean,
  top?: number,
  left?: number,
};

type PanelState = Omit<PanelOptions, 'listener'>;

export type TextControlOptions = RootOptions & {
  value?: string,
  autocomplete?: boolean,
  maxLength?: number,
  pattern?: string,
  placeholder?: string,
  readOnly?: boolean,
};

type TextControlState = Omit<TextControlOptions, 'listener'>;

export type TextAreaControlOptions = RootOptions & {
  value?: string,
  autocomplete?: boolean,
  cols?: number,
  maxLength?: number,
  minLength?: number,
  placeholder?: string,
  readOnly?: boolean,
  rows?: number,
};

type TextAreaControlState = Omit<TextAreaControlOptions, 'listener'>;

export type ButtonControlOptions = RootOptions & {
  type?: string,
};

type ButtonControlState = Omit<ButtonControlOptions, 'listener'>;

export type CheckboxControlOptions = RootOptions & {
  checked?: boolean,
  readOnly?: boolean,
};

type CheckboxControlState = Omit<CheckboxControlOptions, 'listener'>;

export type NumberControlOptions = RootOptions & {
  value?: number,
  max?: number,
  min?: number,
  placeholder?: string,
  readOnly?: boolean,
  step?: number,
};

type NumberControlState = Omit<NumberControlOptions, 'listener'>;

export type FileControlOptions = RootOptions & {
  files?: FileList,
  accept?: string,
  disabled?: boolean,
  // multiple?: boolean,
  readOnly?: boolean,
};

type FileControlState = Omit<FileControlOptions, 'listener'>;

export type RangeControlOptions = RootOptions & {
  value?: number,
  max?: number,
  min?: number,
  readOnly?: boolean,
  step?: number,
};

type RangeControlState = Omit<RangeControlOptions, 'listener'>;

export type DropDownItem = {
  id: string,
  text: string,
  value: string,
};

export type DropDownControlOptions = RootOptions & {
  expanded?: boolean,
  selected?: string,
  items?: DropDownItem[],
  // multi?: boolean,
};

type DropDownControlState = Omit<DropDownControlOptions, 'listener'>;

export type ColorControlOptions = RootOptions & {
  value?: string,
  expanded?: boolean,
};

type ColorControlState = Omit<ColorControlOptions, 'listener'>;

export type ControlOptions = ButtonControlOptions
| TextControlOptions
| CheckboxControlOptions
| NumberControlOptions
| FileControlOptions
| TextAreaControlOptions
| RangeControlOptions
| DropDownControlOptions
| ColorControlOptions;

type ControlState = ButtonControlState
| TextControlState
| CheckboxControlState
| NumberControlState
| FileControlState
| TextAreaControlState
| RangeControlState
| DropDownControlState
| ColorControlState;

export type InternalState = (PanelState | ControlState) & {
  [key: string]: string | boolean | number | DropDownItem[],
  readonly id: string,
};

export type InternalStateSetter = (
  target: InternalState,
  key: string,
  value: string | boolean | number,
) => boolean;

export type ParentOptions = PanelOptions | SectionOptions;

export type PanelPosition = {
  top: number,
  left: number,
};

export type ConfigControlNode = Omit<InternalState, 'id'> & {
  displayType: string,
};

export type ConfigSectionOptions = SectionOptions & {
  displayType: string,
};

export type ConfigSectionNode = {
  options: ConfigSectionOptions,
  children: {
    [key: string]: ConfigControlNode,
  },
};

export type SectionConfig = {
  [key: string]: ConfigControlNode
};

export type PanelConfig = {
  [key: string]: ConfigControlNode | ConfigSectionNode
};
