import { Checkbox } from './Checkbox';

let checkbox: Checkbox;
let userListener: any;

describe('Button control', () => {
  beforeEach(() => {
    userListener = jest.fn();
    checkbox = new Checkbox({
      id: 'id',
      name: 'Button',
      options: {
        checked: false,
      },
      parentElement: document.body,
      userListener,
    });
  });

  test('If it matches the snapshot', () => {
    expect(checkbox.element).toMatchSnapshot();
  });

  test('Disable', () => {
    checkbox.disable();
    expect(checkbox.element).toMatchSnapshot();
  });

  test('Enable', () => {
    checkbox.disable();
    checkbox.enable();
    expect(checkbox.controlElement.hasAttribute('disabled')).toBe(false);
    expect(checkbox.element).toMatchSnapshot();
  });

  test('Check and uncheck', () => {
    checkbox.check();
    expect(checkbox.checked).toBe(true);
    checkbox.uncheck();
    expect(checkbox.checked).toBe(false);
  });

  test('Invoke onClick and userListener callback', () => {
    checkbox.check();
    expect(userListener).toHaveBeenCalledTimes(1);
  });
});
