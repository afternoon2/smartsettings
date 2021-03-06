import { RootNode } from './RootNode';
import {
  InternalState, InternalStateSetter, Listener, ControlOptions, PanelOptions, ListenerUpdate,
} from '../types';

const listener = jest.fn();
class DerivedClass extends RootNode {
  public parentElement: HTMLElement;

  public displayType: string = '';

  public element: HTMLElement;

  protected state: InternalState;

  protected listeners: Map<string, Listener> = new Map();

  protected stateHandler: ProxyHandler<InternalState> = {
    set: this.createNewStateSetter(),
  };

  listenerInvoked: boolean = false;

  constructor() {
    super();
    this.parentElement = document.createElement('div');
    this.element = document.createElement('div');
    this.state = RootNode.createState(
      'id', {
        name: 'name',
        collapsed: true,
      }, this.stateHandler,
    );
    this.listeners.set(
      'id',
      // eslint-disable-next-line
      (update: ListenerUpdate) => {
        this.listenerInvoked = true;
      },
    );
    this.listeners.set('user', listener);
  }

  get internalState(): InternalState {
    return this.state;
  }

  // eslint-disable-next-line
  validElement(parent: HTMLElement | string): boolean {
    return RootNode.isParentValid(parent);
  }

  // eslint-disable-next-line
  parentEl(parent: HTMLElement | string): HTMLElement | null {
    return RootNode.getParentElement(parent);
  }

  // eslint-disable-next-line
  createInternalState(
    id: string,
    options: ControlOptions | PanelOptions,
    handler: ProxyHandler<InternalState>,
  ): InternalState {
    return RootNode.createState(id, options, handler);
  }

  createNewStateSetter(): InternalStateSetter {
    return this.createStateSetter();
  }

  checkParent(parent?: HTMLElement | string | null) {
    this.checkParentElement(parent);
  }

  setListener(listenerFunc: Listener) {
    this.listeners.set('control', listenerFunc);
  }
}

describe('RootNode', () => {
  let derived: DerivedClass;

  beforeEach(() => {
    derived = new DerivedClass();
  });

  test('isValidElement', () => {
    const invalidParentSelector = '.invalidParent';
    expect(derived.validElement(invalidParentSelector)).toBe(false);

    const validParentClass = 'parent';
    const validParentSelector = `.${validParentClass}`;
    const validParent = document.createElement('div');
    validParent.classList.add(validParentClass);
    document.body.appendChild(validParent);
    expect(derived.validElement(validParentSelector)).toBe(true);
    expect(derived.validElement(validParent)).toBe(true);
  });

  test('getParentElement', () => {
    const validParentClass = 'parent';
    const validParentSelector = `.${validParentClass}`;
    const validParent = document.createElement('div');
    validParent.classList.add(validParentClass);
    document.body.appendChild(validParent);

    const requestedElement = <HTMLElement>derived.parentEl(validParentSelector);
    expect(requestedElement.classList.contains('parent')).toBe(true);

    const requestedAgain = <HTMLElement>derived.parentEl(validParent);
    expect(requestedAgain.classList.contains('parent')).toBe(true);

    expect(derived.internalState).toMatchObject({
      id: 'id',
      name: 'name',
      collapsed: true,
    });
  });

  test('createState', () => {
    const testState = derived.createInternalState(
      'id',
      {
        name: 'name',
        collapsed: true,
      },
      {
        // eslint-disable-next-line
        set(target: InternalState, key: string, value: string | boolean | number) {
          return true;
        },
      },
    );
    expect(testState).toMatchObject({
      id: 'id',
      name: 'name',
      collapsed: true,
    });
  });

  test('createStateSetter', () => {
    const handler = {
      set: derived.createNewStateSetter(),
    };
    const state: InternalState = {
      id: 'id',
      name: 'name',
    };
    handler.set(state, 'id', 'test_id');
    expect(derived.listenerInvoked).toBe(true);
    expect(typeof handler.set).toBe('function');
  });

  test('checkParentElement', () => {
    const element = document.createElement('div');
    element.classList.add('test');
    document.body.appendChild(element);
    derived.checkParent(element);
    expect(derived.parentElement).toBe(element);
  });

  test('Show and hide', () => {
    derived.show();
    expect(derived.invisible).toBe(false);
    derived.hide();
    expect(derived.invisible).toBe(true);
  });

  test('Disable and enable', () => {
    derived.disable();
    expect(derived.disabled).toBe(true);
    derived.enable();
    expect(derived.disabled).toBe(false);
  });

  test('Rename', () => {
    derived.rename('Renamed');
    expect(derived.name).toBe('Renamed');
  });

  test('Id getter', () => {
    expect(derived.id).toBe('id');
  });
});
