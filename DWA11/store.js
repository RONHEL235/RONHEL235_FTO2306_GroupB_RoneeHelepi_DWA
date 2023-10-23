import { createStore } from 'redux'

//State
const initialState = {
   count: 0
}

//Actions
const increment = () => {
    return { type: 'INCREMENT' }
}
  
const decrement = () => {
    return { type: 'DECREMENT' }
}

const reset = () => {
    return { type: 'RESET' }
}

//Reducer
const counterReducer = (initialState, action) => {
    const { ...state } = initialState
    switch (action.type) {
      case 'INCREMENT':
        return initialState.count + 1
      case 'DECREMENT':
        return initialState.count - 1
      case 'RESET':
        return initialState.count = 0
      default:
        return initialState.count
    }
}

const store = createStore(counterReducer);

// Subscribe to the store to listen for changes
store.subscribe(() => console.log('Current count:', store.getState()))

store.dispatch(increment());
store.dispatch(increment());

