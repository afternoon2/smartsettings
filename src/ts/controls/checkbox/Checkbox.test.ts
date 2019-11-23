import { CheckboxControl } from './CheckboxControl';

let checkbox: CheckboxControl;
let listener: any;

describe('Button control', () => {
  beforeEach(() => {
    listener = jest.fn();
    checkbox = new CheckboxControl({
      id: 'id',
      name: 'Button',
      options: {
        checked: false,
      },
      parentElement: document.body,
      listener,
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
