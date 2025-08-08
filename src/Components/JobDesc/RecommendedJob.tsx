import { useEffect, useState } from 'react';
import JobCard from '../FindJobs/JobCard'
import { useParams } from 'react-router-dom'
import { getAllJobs } from '../../Services/JobService';

function RecommendedJob() {
  const {id} = useParams();
    const[jobList , setJobList] = useState<any>(null);
    useEffect(()=>{
        getAllJobs().then((data)=>{
            // console.log("Recomended Jobs data : " , data);
            setJobList(data);

        }).catch((err)=>{
            console.log("Occured error while fetching recommended jobs : " , err);
        });
    },[])

  return (
    <div>
        <div className='text-xl font-semibold mb-5 '>Recommended Jobs</div>
        <div className='flex flex-col flex-wrap gap-5 '>
            {
                jobList?.map((job:any , index:number) => index <6 && id!==job.id && <JobCard key={index} {...job} /> )
            }
        </div>

    </div>
  )
}

export default RecommendedJob