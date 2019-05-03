const intialState = {
    signIn_Email:null,
    signIn_Password:null,
    UserName:"",
    
}

const reducer = (state = intialState, action)=> {
    switch (action.type) {
        case 'STORING_USERNAME':
        // alert('str')
            return {
                ...state, 
                UserName: action.value
            }
        case 'USERNAME_REMOVING':
            return {
                ...state,
                UserName: ''
            }
        case 'SIGNIN_SIGNUP_HDN':
            return {
                ...state,
                signHide:!state.signHide
            }
        case 'TAKING_EDITING' :
            return {
                ...state,
                updatedTask:action.payload.updatedTask,
                deletingId:action.payload.deletingId
            }
        case 'EDITING_CLEARING' :
            return  {
                ...state,
                updatedTask:"",
                deletingId:""
            }
        default: return state
    } 
};

export default reducer;