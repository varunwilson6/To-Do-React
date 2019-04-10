const redux = require('redux');
const createStore = redux.createStore;

 
const intailState = {
    counter:0,
}

// Reducer
const rootReducer = (state = intailState,  action) => {
    if(action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1,
        };
    }
    if(action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value,
        };
    }
    return state;
}

// store
const store = createStore(rootReducer);
console.log(store.getState());


// Subsription
store.subscribe(() => {
    console.log('State Changed', store.getState());
})

// DIspatching Action
store.dispatch({type: 'INC_COUNTER'})
store.dispatch({type: 'ADD_COUNTER', value: 10})



console.log(store.getState());