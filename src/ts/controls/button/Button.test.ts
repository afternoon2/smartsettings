import { Button } from './Button';

let btn: Button;

const userListener = jest.fn();

describe('Button control', () => {
  beforeEach(() => {
    btn = new Button({
      id: 'id',
      name: 'Button',
      options: {
        text: 'text',
      },
      parentElement: document.body,
      userListener,
    });
  });

  test('If it matches the snapshot', () => {
    expect(btn.element).toMatchSnapshot();
  });

  test('Disable', () => {
    btn.disable();
    expect(btn.element).toMatchSnapshot();
  });

  test('Enable', () => {
    btn.disable();
    btn.enable();
    expect(btn.controlElement.hasAttribute('disabled')).toBe(false);
    expect(btn.element).toMatchSnapshot();
  });

  test('Invoke onClick and userListener callback', () => {
    btn.controlElement.click();
    expect(userListener).toHaveBeenCalledTimes(4);
  });
});
