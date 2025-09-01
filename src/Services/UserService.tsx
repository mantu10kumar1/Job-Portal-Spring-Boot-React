import axiosInstance from "../Intercepter/AxiosInterceptor";


const registerUser = async (user:any) => {
    return axiosInstance.post(`/users/register` , user)
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}

const loginUser = async (login:any) => {
    return axiosInstance.post(`/users/login` , login)
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}

const sendOtp = async (email : string) =>{
    return axiosInstance.post(`/users/sendOtp/${email}`)
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}

// Function to verify the OTP
const verifyOtp = async (email:any , otp:any) =>{
    return axiosInstance.get(`/users/verifyOtp/${email}/${otp}`)
    .then(res => res.data)  
    .catch(error =>{
        throw error;
    });
}

// Function to reset the password
const changePassword = async (email:any , password:string) =>{
    return axiosInstance.post(`/users/changePass`, { email, password})
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}

export {registerUser , loginUser , sendOtp, verifyOtp, changePassword};