export type ControlType = 'button'
| 'range'
| 'select'
| 'checkbox'
| 'text'
| 'textarea'
| 'number'
| 'file'
| 'color';

export type TextControlOptions = {
  value: string,
  alt?: string,
  autocomplete?: boolean,
  autofocus?: boolean,
  disabled?: boolean,
  listener?: ControlListener,
  maxLength?: number,
  name?: string,
  pattern?: string,
  placeholder?: string,
  readOnly?: boolean,
};

export type TextAreaControlOptions = {
  value: string,
  autocomplete?: boolean,
  autofocus?: boolean,
  cols?: number,
  disabled?: boolean,
  listener?: ControlListener,
  maxLength?: number,
  minLength?: number,
  name?: string,
  placeholder?: string,
  readOnly?: boolean,
  rows?: number,
  wrap?: boolean,
};

export type CheckboxControlOptions = {
  value: string,
  alt?: string,
  autocomplete?: boolean,
  autofocus?: boolean,
  checked?: boolean,
  disabled?: boolean,
  listener?: ControlListener,
  maxLength?: number,
  name?: string,
  pattern?: string,
  placeholder?: string,
  readOnly?: boolean,
};

export type ButtonControlOptions = {
  value: string,
  autofocus?: boolean,
  disabled?: boolean,
  listener?: ControlListener,
  name?: string,
  type?: string,
};

export type NumberControlOptions = {
  value: number,
  autofocus?: boolean,
  disabled?: boolean,
  listener?: ControlListener,
  max?: number,
  min?: number,
  name?: string,
  placeholder?: string,
  readOnly?: boolean,
  step?: number,
};

export type FileControlOptions = {
  accept?: string,
  autofocus?: boolean,
  disabled?: boolean,
  listener?: ControlListener,
  multiple?: boolean,
  name?: string,
  placeholder?: string,
  readOnly?: boolean,
  step?: number,
};

export type RangeControlOptions = {
  value: number,
  autofocus?: boolean,
  disabled?: boolean,
  labels?: boolean,
  listener?: ControlListener,
  marks?: boolean,
  max?: number,
  min?: number,
  name?: string,
  placeholder?: string,
  readOnly?: boolean,
  step?: number,
};

export type ControlOptions = ButtonControlOptions
| TextControlOptions
| CheckboxControlOptions
| NumberControlOptions
| FileControlOptions
| TextAreaControlOptions
| RangeControlOptions;

export type ControlListenerUpdate = {
  id: string,
  rootId: string,
  options: ControlOptions,
};

export type ControlListener = (update: ControlListenerUpdate) => void;
