// Redux setup
import { createStore } from 'redux'

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
const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    case 'RESET':
      return state = 0
    default:
      return state
  }
}

// Create a Redux store
const store = createStore(counterReducer)

// Subscribe to the store to listen for changes
store.subscribe(() => console.log('Current count:', store.getState()))

// Dispatch actions to update the state
store.dispatch(increment())
store.dispatch(increment())
store.dispatch(increment())
store.dispatch(reset())
store.dispatch(decrement())
store.dispatch(increment())