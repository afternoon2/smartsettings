/**
 * Contains all private utilities used by helpers
 * @type {Object}
 * @property {function} createElement - Creates new DOM element
 * @private
 */
const utils = {
    /**
     * Creates new DOM element
     * @param {string} type - type of element 
     * @param {Object} attributes - attributes of that element
     * @return {Node}
     */
    createElement: (type, attributes) => {
        let element = document.createElement(type)
        if (attributes) {
            for (let key in attributes) {
                if (key === 'class') {
                    element.classList.add.apply(
                        element.classList,
                        [attributes[key]]
                    )
                } else {
                    element[key] = attributes[key]
                }
            }
        }
        return element
    }
}

export default utils