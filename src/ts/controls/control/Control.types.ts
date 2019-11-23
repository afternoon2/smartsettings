export type PanelPropsType<Options> = {
  id: string,
  name: string,
  options: Options,
  parentElement: HTMLElement,
  listener?: ControlListener,
};

export type ControlPropsType<Options> = PanelPropsType<Options> & {
  sectionListener?: ControlListener,
  panelListener?: ControlListener,
}

export type TextControlOptions = {
  value?: string,
  autocomplete?: boolean,
  disabled?: boolean,
  maxLength?: number,
  pattern?: string,
  placeholder?: string,
  readOnly?: boolean,
};

export type TextControlProps = ControlPropsType<TextControlOptions>;

export type TextAreaControlOptions = {
  value?: string,
  autocomplete?: boolean,
  cols?: number,
  disabled?: boolean,
  maxLength?: number,
  minLength?: number,
  placeholder?: string,
  readOnly?: boolean,
  rows?: number,
};

export type TextAreaControlProps = ControlPropsType<TextAreaControlOptions>;

export type ButtonControlOptions = {
  text?: string,
  disabled?: boolean,
  type?: string,
};

export type ButtonControlProps = ControlPropsType<ButtonControlOptions>;

export type CheckboxControlOptions = {
  checked?: boolean,
  disabled?: boolean,
  readOnly?: boolean,
};

export type CheckboxControlProps = ControlPropsType<CheckboxControlOptions>;

export type NumberControlOptions = {
  value?: number,
  disabled?: boolean,
  max?: number,
  min?: number,
  placeholder?: string,
  readOnly?: boolean,
  step?: number,
};

export type NumberControlProps = ControlPropsType<NumberControlOptions>;

export type FileControlOptions = {
  files?: FileList,
  accept?: string,
  disabled?: boolean,
  // multiple?: boolean,
  readOnly?: boolean,
};

export type FileControlProps = ControlPropsType<FileControlOptions>;

export type RangeControlOptions = {
  value?: number,
  disabled?: boolean,
  max?: number,
  min?: number,
  readOnly?: boolean,
  step?: number,
};

export type RangeControlProps = ControlPropsType<RangeControlOptions>;

export type ControlOptions = ButtonControlOptions
| TextControlOptions
| CheckboxControlOptions
| NumberControlOptions
| FileControlOptions
| TextAreaControlOptions
| RangeControlOptions;

export type ControlProps = TextControlProps
| TextAreaControlProps
| ButtonControlProps;

export type ControlListenerUpdate = {
  targetId: string,
  key: string,
  value: string | boolean | number,
  listenerType: 'control' | 'section' | 'panel' | 'builtin',
};

export type ControlListener = (update: ControlListenerUpdate) => void;
