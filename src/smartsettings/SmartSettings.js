// @flow
import type { PositionObject, SmartSettingsObject } from './types/SmartSettings.types'

class SmartSettings {
    
    name: string;
    position: PositionObject;

    constructor(
        name: string, 
        position: PositionObject
    ) {
        this.name = name
        this.position = position
    }

    _create() {
        
    }

    _delete() {
        
    }
}

export default SmartSettings