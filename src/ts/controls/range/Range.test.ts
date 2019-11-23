import { RangeControl } from './RangeControl';

let control: RangeControl;

const listener = jest.fn();

describe('Range control', () => {
  beforeEach(() => {
    control = new RangeControl({
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
      listener,
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
    expect(listener).toHaveBeenCalledTimes(4);
  });
});