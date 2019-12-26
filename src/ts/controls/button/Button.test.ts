import { ButtonControl } from './ButtonControl';

let btn: ButtonControl;

const listener = jest.fn();

describe('Button control', () => {
  beforeEach(() => {
    btn = new ButtonControl({
      id: 'id',
      options: {
        name: 'Button',
        listener,
      },
      parentElement: document.body,
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

  test('Invoke onClick and listener callback', () => {
    btn.controlElement.click();
    expect(listener).toHaveBeenCalledTimes(4);
  });
});
