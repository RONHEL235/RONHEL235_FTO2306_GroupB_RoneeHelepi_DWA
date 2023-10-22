//Interface

/**
 * @typedef {object} Item
 * @prop {number} value
 */

/**
 * @typedef {object} State
 * @prop {Item} wind
 * @prop {Item} temperature 
 * @prop {Item} humidity  
 */

/** //A function
 * @callback Action
 * @param {State}
 * @returns {State}
 */

/** //A function 
 * @callback Update
 * @param {Action}
 */

/** //A function 
 * @callback Subscribe
 */

/** 
 * @typedef {object} Store
 * @prop {Update} update
 * @prop {Subscribe} subscribe
 */

//All our side effects happen here
//Side effects is usually where you data resides
const initial = {
    wind: {
        value: 1,
    },
    temperature: {
        value: 1,
    },
    humidity: {
        value: 1,
    }
}

// Store handles all the side effects for you.
//This function is the only function that can be mutated

const states = [initial] //The state can be replaced

export const update = (action) => {
    if (typeof action !== 'function') {
        throw new Error('action is required to be a function')
    }

    const prev = Object.freeze({ ...states[0] })
    const next = Object.freeze({ ...action(prev) })

    states.unshift(next)
}

export const subscribe = () => {}