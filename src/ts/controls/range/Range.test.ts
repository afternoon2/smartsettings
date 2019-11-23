import { RangeControl } from './RangeControl';

let control: RangeControl;
let listener: any;

describe('Range control', () => {
  beforeEach(() => {
    listener = jest.fn();
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

  test('Get and set min, max and step', () => {
    control.step = 0.1;
    expect(control.step).toBe(0.1);
    expect(control.controlElement.getAttribute('step')).toBe('0.1');

    control.min = -4;
    expect(control.min).toBe(-4);
    expect(control.controlElement.getAttribute('min')).toBe('-4');

    control.max = 4;
    expect(control.max).toBe(4);
    expect(control.controlElement.getAttribute('max')).toBe('4')
  });

  test('If it assings user listener correctly', () => {
    control.step = 1;
    expect(listener).toHaveBeenCalledTimes(1);
  });
});