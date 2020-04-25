export const logIn = (data)=>{
    return{
        type: "LOGIN_SUCCESS",
        payload:{data}
    }
    
}

export const logOut = (data)=>{
    localStorage.removeItem('userData')
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