type Props<Options> = {
  id: string,
  name: string,
  options: Options,
  parentElement: HTMLElement,
  userListener?: ControlListener,
};

export type TextControlOptions = {
  value: string,
  autocomplete?: boolean,
  disabled?: boolean,
  maxLength?: number,
  pattern?: string,
  placeholder?: string,
  readOnly?: boolean,
};

export type TextControlProps = Props<TextControlOptions>;

export type TextAreaControlOptions = {
  value: string,
  autocomplete?: boolean,
  cols?: number,
  disabled?: boolean,
  maxLength?: number,
  minLength?: number,
  placeholder?: string,
  readOnly?: boolean,
  rows?: number,
};

export type TextAreaControlProps = Props<TextAreaControlOptions>;

export type ButtonControlOptions = {
  text?: string,
  disabled?: boolean,
  type?: string,
};

export type ButtonControlProps = Props<ButtonControlOptions>;

export type CheckboxControlOptions = {
  checked: boolean,
  checkboxId: string,
  disabled?: boolean,
  readOnly?: boolean,
};

export type CheckboxControlProps = Props<CheckboxControlOptions>;

export type NumberControlOptions = {
  value: number,
  disabled?: boolean,
  max?: number,
  min?: number,
  placeholder?: string,
  readOnly?: boolean,
  step?: number,
};

export type NumberControlProps = Props<NumberControlOptions>;

export type FileControlOptions = {
  controlId: string,
  files?: FileList,
  accept?: string,
  disabled?: boolean,
  // multiple?: boolean,
  readOnly?: boolean,
};

export type FileControlProps = Props<FileControlOptions>;

export type RangeControlOptions = {
  value: number,
  disabled?: boolean,
  max?: number,
  min?: number,
  readOnly?: boolean,
  step?: number,
};

export type RangeControlProps = Props<RangeControlOptions>;

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
  id: string,
  key: string,
  value: string | boolean | number,
};

export type ControlListener = (update: ControlListenerUpdate) => void;
