const increase = (state) => {
    return {
     ...state
    }          
 }
 
 const decrease = (state) => {
     const result = {}
     result.value = state.value - 1
     return result
 }
 
 const get = (state, key) => {
     return state[key]
 }
 