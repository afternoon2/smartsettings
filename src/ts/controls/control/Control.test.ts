import { Control } from './Control';
import { InternalState } from '../../root/RootNode';
import { ControlListener } from '../controls.types';

// @ts-ignore
import Styles from '../../../sass/control.sass';

class DerivedControl extends Control {
  public parentElement: HTMLElement = document.body;
  public element: HTMLElement;
  public controlElement: HTMLElement;

  protected state: InternalState;
  protected template = (state: InternalState): string => `
    <input type="text" id="testId" value="${state.value} />`;
  protected listeners: Map<string, ControlListener> = new Map();

  private stateHandler: ProxyHandler<InternalState> = {
    set: this.createStateSetter(),
  };

  constructor() {
    super();
    this.state = this.createState(
      'id', 'name', {}, this.stateHandler,
    );
    this.element = this.createControlElement(
      this.template(this.state),
      this.state.name,
      this.state.id,
    );
    this.controlElement = this.element.querySelector(`#testId`) as HTMLElement;
  }

  getRootDiv() {
    return this.createRootDiv();
  }

  getControlElement() {
    return this.createControlElement(
      this.template(this.state), this.state.name, this.state.id,
    );
  }
}

let instance: DerivedControl;

describe('Abstract Control class', () => {
  describe('Control class methods', () => {
    beforeEach(() => {
      instance = new DerivedControl();
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
  });
});
