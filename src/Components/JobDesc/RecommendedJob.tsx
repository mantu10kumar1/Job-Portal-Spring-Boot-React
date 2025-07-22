import JobCard from '../FindJobs/JobCard'
import { jobList } from '../../Data/JobsData'

function RecommendedJob() {
  return (
    <div>
        <div className='text-xl font-semibold mb-5 '>Recommended Jobs</div>
        <div className='flex flex-col flex-wrap gap-5 '>
            {
                jobList.map((job , index) => index <6 && <JobCard key={index} {...job} /> )
            }
        </div>

    </div>
  )
}

export default RecommendedJob