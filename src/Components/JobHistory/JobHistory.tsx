import { Tabs } from '@mantine/core'
import Card from './Card'
// import { jobList } from '../../Data/JobsData'
import { useEffect, useState } from 'react'
import { getAllJobs } from '../../Services/JobService';
import { useSelector } from 'react-redux';

function JobHistory() {
    const profile = useSelector((state:any) => state.profile);
    const [activeTab , setActiveTab] = useState<any>("APPLIED");
    const [jobList , setJobList] = useState<any>([]);
    const [showList , setShowList] = useState([]);
    useEffect(() =>{
        window.scrollTo(0,0);
        getAllJobs().then((res)=>{
            setJobList(res);
            setShowList(res.filter((job:any) =>job.applicants?.filter((applicant:any) => applicant.applicantId === profile.id && 
            applicant.applicantStatus === "APPLIED").length > 0))
        }).catch((err)=>{
            console.log("Occured error while fetching  Job History : " , err);
        });
    },[])
    const handleTabChange = (value:string |null) =>{
        setActiveTab(value);
        if(value === 'SAVED'){
            setShowList(jobList.filter((job:any) =>profile.savedJobs?.includes(job.id)));
        } else{
            setShowList(jobList.filter((job:any) =>job.applicants?.filter((applicant:any) => applicant.applicantId === profile.id && 
            applicant.applicantStatus === value).length > 0))
        }
    }
    return (
        <div className=''>
            <div className='text-2xl font-semibold mb-5' >Job History</div>
            <div>
                <Tabs value={activeTab} onChange={handleTabChange} variant="outline" radius="lg" >
                    <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400  " >
                        <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
                        <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
                        <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
                        <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value={activeTab}>
                        <div className='mt-10 flex flex-wrap gap-5 justify-between '>
                            {
                                showList.map((job:any, index:number) => <Card key={index} {...job} applied />)
                            }
                        </div>
                    </Tabs.Panel>
                   
                   {/* 
                    <Tabs.Panel value="saved">
                        <div className='mt-10 flex flex-wrap gap-5 justify-between '>
                            {
                                jobList.map((job, index) => <Card key={index} {...job} saved/>)
                            }
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="offered">
                        <div className='mt-10 flex flex-wrap gap-5 justify-between '>
                            {
                                jobList.map((job, index) => <Card key={index} {...job} offered />)
                            }
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="interviewing">
                        <div className='mt-10 flex flex-wrap gap-5 justify-between '>
                            {
                                jobList.map((job, index) => <Card key={index} {...job} interviewing />)
                            }
                        </div>
                    </Tabs.Panel>

                   */}

                </Tabs>
            </div>
        </div>
    )
}

export default JobHistory