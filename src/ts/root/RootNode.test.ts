import { RootNode } from './RootNode';

describe('RootNode', () => {
  test('RootNode protected methods', () => {
    const options = {
      invisible: false,
      locked: true,
    };
    class DerivedClass extends RootNode {
      constructor() {
        super('title', options);
      }

      validElement(parent: HTMLElement | string): boolean {
        return this.isValidElement(parent);
      }

      parentElement(parent: HTMLElement | string): HTMLElement {
        return this.getParentElement(parent);
      }
    }

    const derived = new DerivedClass();

    const invalidParentSelector = '.invalidParent';
    expect(derived.validElement(invalidParentSelector)).toBe(false);

    const validParentClass = 'parent';
    const validParentSelector = `.${validParentClass}`;
    const validParent = document.createElement('div');
    validParent.classList.add(validParentClass);
    document.body.appendChild(validParent);
    expect(derived.validElement(validParentSelector)).toBe(true);
    expect(derived.validElement(validParent)).toBe(true);

    const requestedElement = derived.parentElement(validParentSelector);
    expect(requestedElement.classList.contains('parent')).toBe(true);

    const requestedAgain = derived.parentElement(validParent);
    expect(requestedAgain.classList.contains('parent')).toBe(true);
  });
});
