import { DropDownControl } from './DropDown';

let control: DropDownControl;
let listener: any;

describe('Dropdown control', () => {
  beforeEach(() => {
    listener = jest.fn();
    control = new DropDownControl({
      id: 'id',
      options: {
        name: 'Dropdown',
        selected: 'item-1',
        items: [
          {
            id: 'id-1',
            text: 'Item 1',
            value: 'item-1',
          },
          {
            id: 'id-2',
            text: 'Item 2',
            value: 'item-2',
          }
        ],
        listener,
      },
      parentElement: document.body,
    });
  });

  test('Disable', () => {
    control.disable();
    const btn = control.controlElement.querySelector('button') as HTMLButtonElement;
    expect(control.disabled).toBe(true);
    expect(btn.hasAttribute('disabled')).toBe(true);
    expect(listener).toHaveBeenCalledTimes(1);
  });

  test('Enable', () => {
    control.disable();
    control.enable();
    expect(control.controlElement.hasAttribute('disabled')).toBe(false);
    expect(listener).toHaveBeenCalledTimes(2);
  });

  test('Toggle', () => {
    control.toggle();
    expect(control.expanded).toBe(true);
    control.toggle();
    expect(control.expanded).toBe(false);
    expect(listener).toHaveBeenCalledTimes(2);
  });

  test('Select', () => {
    expect(control.selected).toBe('item-1');
    control.select('item-2');
    expect(control.selected).toBe('item-2');
    expect(listener).toHaveBeenCalledTimes(1);
  });
});