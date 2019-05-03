const redux = require('redux');
const createStore = redux.createStore;

const intialState = {
    counter: 0
}

// Reducer
const rootReducer = (state = intialState, action) => {
    if(action.type === 'INC_COUNTER') {
        return {
            ...state,
            counter:state.counter + 1
        }
    }
    if(action.type === 'ADD_COUNTER') {
        return {
            ...state,
            counter:state.counter + action.value
        };  
    }
    return state;
}

// store
const store = createStore(rootReducer);

// Subsription
store.subscribe(() => {
    console.log('[Suscribtion] ' ,
     store.getState())
})

// DIspatching Action
store.dispatch({type: 'INC_COUNTER'});
store.dispatch({type: 'ADD_COUNTER', value: 10});

