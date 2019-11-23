import { CheckboxControl } from './CheckboxControl';

let checkbox: CheckboxControl;
let listener: any;

describe('Button control', () => {
  beforeEach(() => {
    listener = jest.fn();
    checkbox = new CheckboxControl({
      id: 'id',
      options: {
        name: 'Button',
        checked: false,
        listener,
      },
      parentElement: document.body,
    });
  });

  test('Disable', () => {
    checkbox.disable();
    expect(checkbox.disabled).toBe(true);
    expect(checkbox.controlElement.hasAttribute('disabled')).toBe(true);
  });

  test('Enable', () => {
    checkbox.disable();
    checkbox.enable();
    expect(checkbox.controlElement.hasAttribute('disabled')).toBe(false);
  });

  test('Check and uncheck', () => {
    checkbox.check();
    expect(checkbox.checked).toBe(true);
    checkbox.uncheck();
    expect(checkbox.checked).toBe(false);
  });

  test('Invoke onClick and listener callback', () => {
    checkbox.check();
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
