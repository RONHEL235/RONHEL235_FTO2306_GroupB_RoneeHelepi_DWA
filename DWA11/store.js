// Redux setup
import { createStore } from 'redux'
//State
const initialState = {
    counter: 0
}


// Actions
const increment = () => {
    return { type: 'INCREMENT' }
}

const decrement = () => {
    return { type: 'DECREMENT' }
}

const reset = () => {
    return { type: 'RESET' }
}
  
// Reducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, counter: state.counter + 1 };
        case 'DECREMENT':
            return { ...state, counter: state.counter - 1 };
        case 'RESET':
            return { ...state, counter: 0 };
        default:
            return state;
    }
};
// Create a Redux store
const store = createStore(counterReducer)

// Subscribe to the store to listen for changes
store.subscribe(() => console.log('Current count:', store.getState().counter))

// Dispatch actions to update the counter
console.log('Current count:', store.getState().counter)
store.dispatch(increment())
store.dispatch(increment())
store.dispatch(increment())
store.dispatch(reset())
store.dispatch(decrement())
store.dispatch(increment())