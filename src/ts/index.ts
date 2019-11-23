import cuid from 'cuid';

import { PanelOptions } from './nodes/nodes.types';
import { PanelNode } from './nodes/panel/Panel';
import { ControlListener } from './controls/control/Control.types';

export interface SmartSettingsInterface {
  panel: (name?: string, options?: PanelOptions, listener?: ControlListener) => PanelNode;
}

export default function SmartSettings() {
  const version: string = '2.0.0';
  const defaultName: string = `SmartSettings v.${version}`;
  const defaultOptions: PanelOptions = {
    collapsed: false,
    disabled: false,
    draggable: false,
    top: 10,
    left: 10,
  };
  
  return {
    panel(name?: string, options?: PanelOptions, listener?: ControlListener): PanelNode {
      const id = cuid();
      const panel: PanelNode = new PanelNode({
        id, 
        name: name || defaultName, 
        options: options || defaultOptions, 
        listener,
        parentElement: document.body,
      });
      return panel;
    },
  };
}
