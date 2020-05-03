export const logIn = (data)=>{
    return{
        type: "LOGIN_SUCCESS",
        payload:{data}
    }
    
}

export const logOut = (data)=>{
    localStorage.clear()
    return {
        type: "LOGOUT_SUCCESS",
       
    }
}

export const keepLogin = (data)=>{
    return{
        type: "LOGIN_SUCCESS",
        payload: {data}
    }
}