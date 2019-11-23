import { Control } from './Control';
import { InternalState, ListenerUpdate } from '../../types';

// @ts-ignore
import Styles from '../../../sass/control.sass';

const props: any = {
  id: 'id',
  options: {
    value: 'test',
    name: 'name',
    listener: (update: ListenerUpdate) => update,
  },
  parentElement: document.body,
};
class DerivedControl extends Control {
  public controlElement: HTMLElement;

  protected static template = (state: InternalState): string => `
    <input type="text" id="testId" value="${state.value}" />`;

  constructor(props: any) {
    super({
      ...props,
      template: DerivedControl.template
    });
    this.controlElement = this.element.querySelector(`#testId`) as HTMLElement;
  }

  getRootDiv() {
    return this.createRootDiv();
  }

  getControlElement() {
    return this.createControlElement(
      DerivedControl.template(this.state), this.state.name, this.state.id,
    );
  }
}

let instance: DerivedControl;

describe('Abstract Control class', () => {
  describe('Control class methods', () => {
    beforeEach(() => {
      instance = new DerivedControl(props);
    });
    
    test('createRootDiv', () => {
      const div = instance.getRootDiv();
      expect(div).toBeInstanceOf(HTMLDivElement);
      expect(div.classList.contains(Styles.control)).toBe(true);
    });

    test('createControlElement and withControlTemplate', () => {
      const controlElement = instance.getControlElement();
      expect(controlElement).toBeInstanceOf(HTMLElement);
      expect(controlElement).toMatchSnapshot();
    });

    test('readonly setter and getter', () => {
      instance.readonly = true;
      expect(instance.readonly).toBe(true);
      expect(instance.controlElement.getAttribute('readonly')).toBe('true');
      instance.readonly = false;
      expect(instance.readonly).toBe(false);
      expect(instance.controlElement.getAttribute('readonly')).toBe(null);
    });
  });
});
