import axiosInstance from "../Intercepter/AxiosInterceptor";

const getProfile = async (id:any) => {
    return axiosInstance.get(`/profiles/get/${id}`)
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}

const updateProfile = async (profile:any) => {
    return axiosInstance.put(`/profiles/update` , profile)
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}

// get all profiles
const getAllProfiles = async () => {
    return axiosInstance.get(`/profiles/getAll`)
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}

export {getProfile , updateProfile , getAllProfiles};