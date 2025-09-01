import axiosInstance from "../Intercepter/AxiosInterceptor";

// Create job
const postJob = async (job:any) => {
    return axiosInstance.post(`/jobs/post`,job)
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}
// Get all jobs
const getAllJobs = async () => {
    return axiosInstance.get(`/jobs/getAll`)
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}

// Get job by id
const getJob=async(id:any)=>{
    return axiosInstance.get(`/jobs/get/${id}`)
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}

// Apply job
const applyJob = async (id:any ,  applicant:any) => {
    return axiosInstance.post(`/jobs/apply/${id}`,applicant)
    .then((res) =>{
        console.log("applyJob response :" , res.data);
        return res.data;
    })
    .catch(error =>{
        throw error;
    });
}

// get job posted by id
const getJobPosted = async (id:any) => {
    return axiosInstance.get(`/jobs/postedBy/${id}`)
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}

// change application status
const changeAppStatus = async ( applicant:any) => {
    return axiosInstance.post(`/jobs/changeAppStatus`,applicant)
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}


export {postJob , getAllJobs , getJob, applyJob, getJobPosted , changeAppStatus};
