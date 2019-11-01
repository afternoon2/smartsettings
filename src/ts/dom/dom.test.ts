import { isValidElement, createPanelNode, getParentElement } from './dom';

describe('panel.dom', () => {
  describe('checkParentElement', () => {
    test('Checking string parent element', () => {
      const validSelector = '.parent';
      const invalidSelector = 'parent';
      const parent = document.createElement('div');
      parent.classList.add('parent');
      document.body.appendChild(parent);
      expect(isValidElement(validSelector)).toBe(true);
      expect(isValidElement(invalidSelector)).toBe(false);
    });

    test('Checking html parent element', () => {
      const parent = document.createElement('div');
      parent.classList.add('parent');
      expect(isValidElement(parent)).toBe(false);
      document.body.appendChild(parent);
      expect(isValidElement(parent)).toBe(true);
    });
  });

  describe('getParentElement', () => {
    test('Get parent element from string', () => {
      const parent = document.createElement('div');
      parent.classList.add('parent');
      document.body.appendChild(parent);
      const gotParent = getParentElement('.parent');
      expect(gotParent).toMatchObject(parent);
    });

    test('Get parent element from HTMLElement', () => {
      const parent = document.createElement('div');
      parent.classList.add('parent');
      document.body.appendChild(parent);
      const gotParent = getParentElement(parent);
      expect(gotParent).toMatchObject(parent);
    });
  });

  describe('createPanelNode', () => {
    test('Create panel node with required parameters', () => {
      const id = 'test_id';
      const titleStr = 'Test title';
      const node = createPanelNode(titleStr, id);
      const dragLink = <HTMLLinkElement>node.querySelector('.panel__dragLink');
      const title = <HTMLParagraphElement>node.querySelector('.panel__title');
      const collapseLink = <HTMLLinkElement>node.querySelector('.panel__collapseLink');
      const main = <HTMLElement>node.querySelector('.panel__main');
      expect(node.classList.contains('locked')).toBe(false);
      expect(node).toBeInstanceOf(HTMLDivElement);
      expect(dragLink.classList.contains('hidden')).toBe(true);
      expect((<string>title.textContent).search('Test title')).toBeGreaterThan(-1);
      expect((<string>collapseLink.textContent).search('▽')).toBeGreaterThan(-1);
      expect(main.classList[1]).toBe(undefined);
      expect(node).toMatchSnapshot();
    });

    test('Create panel node with not required options', () => {
      const options = {
        collapsed: true,
        draggable: true,
        locked: true,
        invisible: true,
      };
      const node = createPanelNode('Test title', 'test_id', options);
      const dragLink = <HTMLLinkElement>node.querySelector('.panel__dragLink');
      const title = <HTMLParagraphElement>node.querySelector('.panel__title');
      const collapseLink = <HTMLLinkElement>node.querySelector('.panel__collapseLink');
      const main = <HTMLElement>node.querySelector('.panel__main');
      expect(node.classList.contains('locked')).toBe(true);
      expect(node.classList.contains('hidden')).toBe(true);
      expect(node).toBeInstanceOf(HTMLDivElement);
      expect(dragLink.classList.contains('hidden')).toBe(false);
      expect((<string>title.textContent).search('Test title')).toBeGreaterThan(-1);
      expect((<string>collapseLink.textContent).search('▷')).toBeGreaterThan(-1);
      expect(main.classList.contains('hidden')).toBe(true);
      expect(node).toMatchSnapshot();
    });
  });
});
