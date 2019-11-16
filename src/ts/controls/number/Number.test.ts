import { NumberControl } from './NumberControl';

let control: NumberControl;

const userListener = jest.fn();

describe('Number control', () => {
  beforeEach(() => {
    control = new NumberControl({
      id: 'id',
      name: 'name',
      options: {
        value: 0,
        min: 0,
        max: 10,
        step: 0.1,
        disabled: false,
      },
      parentElement: document.body,
      userListener,
    });
  });

  test('If it matches snapshot after initial load', () => {
    expect(control.element).toMatchSnapshot();
  });

  test('Disable', () => {
    control.disable();
    expect(control.element).toMatchSnapshot();
  });

  test('Enable', () => {
    control.disable();
    control.enable();
    expect(control.controlElement.hasAttribute('disabled')).toBe(false);
    expect(control.element).toMatchSnapshot();
  });

  test('Get and set value', () => {
    control.value = 4;
    expect(control.value).toBe(4);
  });

  test('If it assings user listener correctly', () => {
    expect(userListener).toHaveBeenCalledTimes(4);
  });
});