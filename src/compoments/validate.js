export const validateEmail = (text) => {
    const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (text === "") {
        return false
    }else if(!email.test(text)){
        return false
    }
    else{
        return true
    }
}

export const valadatePassword = (text) =>{
     if(text === ""){
        return false
     }else if(text.length > 15){
        return "q"
     }else{
        return true
     }
}
export const valadateRePassword = (text, password) =>{
     if(text === ""){
        return false
     }else if(text.length > 15){
        return "q"
     }else if(text !== password){
        return "notMatch"
     }
     else{
        return true
     }
}
export const valadateMoney = (text) =>{
     if(text === ""){
        return false
     }else{
        return true
     }
}
