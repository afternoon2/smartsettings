import { SlotNode } from './Slot';
import { ButtonControl } from '../../controls/button/ButtonControl';
import { TextControl } from '../../controls/text/TextControl';
import { TextAreaControl } from '../../controls/textarea/TextAreaControl';
import { NumberControl } from '../../controls/number/NumberControl';
import { RangeControl } from '../../controls/range/RangeControl';
import { CheckboxControl } from '../../controls/checkbox/CheckboxControl';
import { FileControl } from '../../controls/file/FileControl';
import { SlotConfig } from '../../types';
import { AnyControl } from '../parent/ParentNode';

let slot: SlotNode;
let listener: any;

describe('Slot node', () => {
  beforeEach(() => {
    listener = jest.fn();
    slot = new SlotNode({
      id: 'id',
      options: {
        name: 'name',
        collapsed: false,
        disabled: false,
        invisible: false,
        listener,
      },
      parentElement: document.body,
    });
  });

  test('If it matches the snapshot', () => {
    expect(slot.element).toMatchSnapshot();
  });

  test('Open and close', () => {
    slot.close();
    expect(slot.collapsed).toBe(true);
    expect(slot.element).toMatchSnapshot();
    slot.open();
    expect(slot.collapsed).toBe(false);
    expect(listener).toHaveBeenCalledTimes(2);
    expect(slot.element).toMatchSnapshot();
    slot.toggle();
    expect(slot.collapsed).toBe(true);
    expect(slot.element).toMatchSnapshot();
  });

  test('Open and close by click', () => {
    (slot.headerElement.querySelector('a') as HTMLAnchorElement).click();
    expect(slot.collapsed).toBe(true);
    expect(slot.element).toMatchSnapshot();
  });

  test('Control creation', () => {
    const btn = slot.control('button', { name: 'Button' });
    const text = slot.control('text', {
      name: 'Text',
      placeholder: 'Write here!',
      value: 'text input',
    });
    const textarea = slot.control('textarea', {
      name: 'Textarea',
      placeholder: 'textarea',
      value: 'Textarea',
    });
    const range = slot.control('range', {
      name: 'Range',
      min: 0, max: 10, value: 1, step: 1,
    });
    const number = slot.control('number', {
      name: 'Number',
      min: 0, max: 10, value: 1, step: 1,
    });
    const checkbox = slot.control('checkbox', {
      name: 'Checkbox',
      checked: true,
    });
    const file = slot.control('file', {
      name: 'Checkbox',
    });
    const falsyControl = slot.control('falsy', {
      name: 'Falsy',
      min: 1, max: 10, step: 1, value: 10,
    });
    expect(btn).toBeInstanceOf(ButtonControl);
    expect(text).toBeInstanceOf(TextControl);
    expect(textarea).toBeInstanceOf(TextAreaControl);
    expect(number).toBeInstanceOf(NumberControl);
    expect(range).toBeInstanceOf(RangeControl);
    expect(checkbox).toBeInstanceOf(CheckboxControl);
    expect(file).toBeInstanceOf(FileControl);
    expect(falsyControl).toBe(null);
  });

  test('Remove methods', () => {
    slot.control('button', { name: 'Button' });
    slot.control('button2', { name: 'Button' });
    slot.remove('Button');
    expect(slot.element.querySelector('#button')).toBe(null);
    expect(slot.element.querySelector('#button2')).toBe(null);

    const btn = slot.control('button', { name: 'Button' }) as ButtonControl;

    slot.removeById(btn.id);
    expect(slot.element.querySelector('button')).toBe(null);

    slot.control('button', { name: 'Button' }) as ButtonControl;

    slot.removeAll();
    expect(slot.contentElement.childElementCount).toBe(0);
  });

  test('Set listener', () => {
    const newListener = jest.fn();
    slot.setListener(newListener);
    slot.close();
    expect(newListener).toHaveBeenCalledTimes(1);
  });

  test('Set/get config', () => {
    const config: SlotConfig = {
      buttonControl: {
        type: 'button',
        displayType: 'button',
        name: 'btn',
      },
      textControl: {
        displayType: 'text',
        value: 'Incididunt ipsum laborum fugiat',
        name: 'input',
      },
    };
    slot.config = config;
    const btn = slot.element.querySelector('button') as HTMLButtonElement;
    const input = slot.element.querySelector('input') as HTMLInputElement;
    expect(btn).not.toBe(null);
    expect(input).not.toBe(null);
    expect(slot.config).toBeInstanceOf(Object);
  });

  test('Find and find by name', () => {
    const text = slot.control('text', {
      name: 'Text',
      placeholder: 'Write here!',
      value: 'text input',
    });
    const textarea = slot.control('textarea', {
      name: 'Textarea',
      placeholder: 'textarea',
      value: 'Textarea',
    }) as AnyControl;

    expect(slot.find('Text')).toBe(text);
    expect(slot.findById(textarea.id)).toBe(textarea);
    expect(slot.find('invalid name')).toBe(undefined);
    expect(slot.findById('invalid id')).toBe(undefined);
  });
});

