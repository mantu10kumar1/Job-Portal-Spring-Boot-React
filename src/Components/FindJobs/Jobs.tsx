import Sort from './Sort'
import JobCard from './JobCard'
import { jobList } from '../../Data/JobsData'
import { useEffect, useState } from 'react';
import { getAllJobs } from '../../Services/JobService';
import { useDispatch, useSelector } from 'react-redux';
import { resetFilter } from '../../Slices/FilterSlice';
import { resetSort } from '../../Slices/SortSlice';

function Jobs() {
    const dispatch = useDispatch();
    const [jobList, setJobList] = useState([{}]);
    const filter = useSelector((state: any) => state.filter);
    const sort = useSelector((state: any) => state.sort);
    const [filteredJobs, setFilteredJobs] = useState<any>([]);

    // print the filtered job list status

    useEffect(() => {
        dispatch(resetFilter());
        dispatch(resetSort());
        getAllJobs().then((res) => {
            const activeJobs = res.filter((job: any) => job.jobStatus == 'ACTIVE');
            setJobList(activeJobs);
            console.log("Jobs Data in Jobs component : ", activeJobs[0]);
        }).catch((err) => {
            console.log("Occured error while fetching jobs : ", err);
            console.log(err);
        });
    }, [])

    useEffect(() =>{

        if(sort == "Most Recent") {
            setJobList([...jobList].sort((a: any, b: any) => new Date(b.postTime).getTime() - new Date(a.postTime).getTime()));
        }
        else if(sort == "Salary: Low to High") {
            setJobList([...jobList].sort((a: any, b: any) => a.packageOffered - b.packageOffered));
        }
        else if(sort == "Salary: High to Low") {
            setJobList([...jobList].sort((a: any, b: any) => b.packageOffered - a.packageOffered));
        }
        

    },[sort])

    useEffect(() => {
        let filtered = jobList;
        // if(filter.name) filtered = filtered.filter((job: any) => job.name.toLowerCase().includes(filter.name.toLowerCase()));
        if (filter["Job Title"] && filter["Job Title"].length > 0) {
            filtered = filtered.filter((job: any) => filter["Job Title"]?.some((title: any) =>
                job.jobTitle?.toLowerCase().includes(title.toLowerCase())));
        }

        // Same for location 

        if (filter.Location && filter.Location.length > 0) {
            filtered = filtered?.filter((job: any) => filter.Location?.some((location: any) =>
                job?.location?.toLowerCase().includes(location.toLowerCase())));
        }

        // Same for experience

        if (filter.Experience && filter.Experience.length > 0) {
            filtered = filtered?.filter((job: any) => filter.Experience?.some((skill: any) =>
                job?.experience.toLowerCase()?.includes(skill.toLowerCase())));
        }

        // Same for jobType
        if (filter["Job Type"] && filter["Job Type"].length > 0) {
            filtered = filtered?.filter((job: any) => filter["Job Type"]?.some((title: any) =>
                job.jobType?.toLowerCase().includes(title.toLowerCase())));
        }

        // same for salary

        if (filter.salary && filter.salary.length > 0) {
            filtered = filtered?.filter((jobs: any) => filter.salary[0] <= jobs.packageOffered && jobs.packageOffered <= filter.salary[1]);
        }


        setFilteredJobs(filtered);

    }, [filter, jobList]);


    return (
        <div className='p-5 '>

            <div className='flex justify-between '>
                <div className='text-2xl font-semibold ' >Recommended Jobs</div>
                <Sort sort="job" />
            </div>

            <div className='mt-10 flex flex-wrap gap-5 justify-between '>
                {
                    filteredJobs?.map((job: any, index: any) => <JobCard key={index} {...job} />)
                }
            </div>

        </div>

    )
}

export default Jobs