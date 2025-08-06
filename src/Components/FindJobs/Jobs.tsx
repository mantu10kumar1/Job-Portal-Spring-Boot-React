import Sort from './Sort'
import JobCard from './JobCard'
import { jobList } from '../../Data/JobsData'
import { useEffect, useState } from 'react';
import { getAllJobs } from '../../Services/JobService';

function Jobs() {
    
    const[jobList , setJobList] = useState([{}]);
    useEffect(()=>{
        getAllJobs().then((data)=>{
            console.log("Jobs data : " , data);
            setJobList(data);

        }).catch((err)=>{
            console.log("Occured error while fetching jobs : " , err);
            console.log(err);
        });
    },[])

    return (
        <div className='p-5 '>

            <div className='flex justify-between '>
                <div className='text-2xl font-semibold ' >Recommended Jobs</div>
                <Sort />
            </div>

            <div className='mt-10 flex flex-wrap gap-5 justify-between '>
                {
                    jobList.map((job, index) => <JobCard key={index} {...job} />)
                }
            </div>

        </div>

    )
}

export default Jobs