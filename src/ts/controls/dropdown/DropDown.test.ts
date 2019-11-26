import { DropDownControl } from './DropDown';
import { DropDownItem } from '../../types';

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
    expect(listener).toHaveBeenCalledTimes(2);
  });

  test('Replace items', () => {
    const newItems: DropDownItem[] = [
      {
        id: 'id-test-1',
        text: 'An Item 1',
        value: 'item-test-1'
      },
      {
        id: 'id-test-2',
        text: 'An Item 2',
        value: 'item-test-2'
      },
      {
        id: 'id-test-3',
        text: 'An Item 3',
        value: 'item-test-3'
      },
    ];
    control.setItems(newItems);
    expect(control.controlElement.querySelectorAll('li').length).toBe(3);
    expect(listener).toHaveBeenCalledTimes(3);
    expect(control.selected).toBe('item-test-1');
  });
});