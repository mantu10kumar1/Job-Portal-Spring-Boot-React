const signupValidation = (name: string , value: string) =>{
    switch(name){
        case 'name':
            if(value.length === 0) return "Name is required";
            return "";
        case 'email' :
            if(value.length === 0) return "Email is required";
            if(!/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(value))
                return "Email is invalid";
            return "";
        case 'password':
            if(value.length === 0) return "Password is required";
            if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,15}$/.test(value))
                return "Password must be 8-15 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character";         
            return "";

            default:
                return "";

    }
}
const loginValidation = (name: string , value: string) =>{
    switch(name){
        case 'email' :
            if(value.length === 0) return "Email is required";
            return "";
        case 'password':
            if(value.length === 0) return "Password is required";
            return "";

            default:
                return "";

    }
}

export {signupValidation, loginValidation};