import cuid from 'cuid';

import { PanelOptions, Listener } from './types';
import { PanelNode } from './nodes/panel/Panel';

export interface SmartSettingsInterface {
  panel: (options?: PanelOptions, listener?: Listener) => PanelNode;
}

export default function SmartSettings(): SmartSettingsInterface {
  const version: string = '2.0.0';
  const defaultName: string = `SmartSettings v.${version}`;
  const defaultOptions: PanelOptions = {
    name: defaultName,
    collapsed: false,
    disabled: false,
    draggable: false,
    invisible: false,
    top: 10,
    left: 10,
  };
  
  return {
    panel(options?: PanelOptions): PanelNode {
      const id = cuid();
      const panel: PanelNode = new PanelNode({
        id,
        options: options || defaultOptions,
        parentElement: document.body,
      });
      return panel;
    },
  };
}
