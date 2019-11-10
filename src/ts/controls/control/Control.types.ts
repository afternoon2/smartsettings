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
  onClick: EventListener,
  text?: string,
  disabled?: boolean,
  type?: string,
};

export type ButtonControlProps = Props<ButtonControlOptions>;

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
| TextAreaControlOptions
| RangeControlOptions;

export type ControlProps = TextControlProps
| TextAreaControlProps
| ButtonControlProps;

export type ControlListenerUpdate = {
  id: string,
  key: string,
  value: string | boolean | number | EventListener,
};

export type ControlListener = (update: ControlListenerUpdate) => void;
