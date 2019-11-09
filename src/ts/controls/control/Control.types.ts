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

export type TextareaControlOptions = {
  value: string,
  autocomplete?: boolean,
  cols?: number,
  disabled?: boolean,
  maxLength?: number,
  minLength?: number,
  placeholder?: string,
  readOnly?: boolean,
  rows?: number,
  wrap?: boolean,
};

export type TextareaControlProps = Props<TextareaControlOptions>;

export type ButtonControlOptions = {
  value: string,
  disabled?: boolean,
  type?: string,
};

export type CheckboxControlOptions = {
  value: string,
  alt?: string,
  autocomplete?: boolean,
  autofocus?: boolean,
  checked?: boolean,
  disabled?: boolean,
  maxLength?: number,
  pattern?: string,
  placeholder?: string,
  readOnly?: boolean,
};

export type NumberControlOptions = {
  value: number,
  autofocus?: boolean,
  disabled?: boolean,
  max?: number,
  min?: number,
  placeholder?: string,
  readOnly?: boolean,
  step?: number,
};

export type FileControlOptions = {
  accept?: string,
  autofocus?: boolean,
  disabled?: boolean,
  multiple?: boolean,
  placeholder?: string,
  readOnly?: boolean,
  step?: number,
};

export type RangeControlOptions = {
  value: number,
  autofocus?: boolean,
  disabled?: boolean,
  labels?: boolean,
  marks?: boolean,
  max?: number,
  min?: number,
  placeholder?: string,
  readOnly?: boolean,
  step?: number,
};

export type ControlOptions = ButtonControlOptions
| TextControlOptions
| CheckboxControlOptions
| NumberControlOptions
| FileControlOptions
| TextareaControlOptions
| RangeControlOptions;

export type ControlProps = TextControlProps;

export type ControlListenerUpdate = {
  id: string,
  key: string,
  value: string | boolean | number,
};

export type ControlListener = (update: ControlListenerUpdate) => void;
