import {combineReducers} from 'redux'

let initState = {
    data:''
}

let authReducer = (state = initState, action)=>{
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return {...state, data: action.payload.data}
        case "LOGOUT_SUCCESS":
            return{...state, ...initState}

        default:
            return state
    }
}

let reducers = combineReducers(
    {
        auth: authReducer
    }
)

export default reducers