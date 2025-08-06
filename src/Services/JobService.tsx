import axios from "axios"
const base_url = "http://localhost:8080/jobs/"

// Create job
const postJob = async (job:any) => {
    return axios.post(`${base_url}post`,job)
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}
// Get all jobs
const getAllJobs = async () => {
    return axios.get(`${base_url}getAll`)
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}

// Get job by id
const getJob=async(id:any)=>{
    return axios.get(`${base_url}get/${id}`)
    .then(res => res.data)
    .catch(error =>{
        throw error;
    });
}

// Apply job
const applyJob = async (id:any ,  applicant:any) => {
    return axios.post(`${base_url}apply/${id}`,applicant)
    .then((res) =>{
        console.log("applyJob response :" , res.data);
        return res.data;
    })
    .catch(error =>{
        throw error;
    });
}


export {postJob , getAllJobs , getJob, applyJob};
