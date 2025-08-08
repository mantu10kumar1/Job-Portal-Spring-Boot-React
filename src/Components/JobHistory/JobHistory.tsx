import { Tabs, Text } from '@mantine/core';
import Card from './Card';
import { useEffect, useState } from 'react';
import { getAllJobs } from '../../Services/JobService';
import { useSelector } from 'react-redux';

function JobHistory() {
  const profile = useSelector((state: any) => state.profile);
  const [activeTab, setActiveTab] = useState<any>("APPLIED");
  const [jobList, setJobList] = useState<any>([]);
  const [showList, setShowList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Helper function to filter jobs based on applicant status
  // This approach is safer and more efficient than using filter().length > 0
  const filterJobsByApplicantStatus = (jobs: any[], status: string) => {
    return jobs.filter((job) =>
      job.applicants?.some((applicant: any) =>
        applicant.applicantId === profile.id && applicant.applicationStatus === status
      )
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    getAllJobs()
      .then((res) => {
        setJobList(res);
        // Set the initial list to 'APPLIED' jobs using the new filtering logic
        const initialAppliedJobs = filterJobsByApplicantStatus(res,  'APPLIED');
        setShowList(initialAppliedJobs);
      })
      .catch((err) => {
        console.log("Occured error while fetching Job History : ", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [profile.id]);

  const handleTabChange = (value: string | null) => {
    if (!value) return;
    setActiveTab(value);
    console.log("value1 : ", value);

    let newShowList = [];
    if (value === 'SAVED') {
      newShowList = jobList.filter((job: any) => profile.savedJobs?.includes(job.id));
      console.log("Job setList in job history1 : ", jobList);
      console.log("Job showList in job history2 : ", showList);
    } else {
      // Use the same robust filtering logic for all other tabs
      newShowList = filterJobsByApplicantStatus(jobList, value);
      console.log("Job setList in job history3 : ", jobList);
      console.log("Job showList in job history4 : ", showList);
    }
    setShowList(newShowList);
    console.log("value2 : ", value);
  };

  return (
    <div className=''>
      <div className='text-2xl font-semibold mb-5' >Job History</div>
      <div>
        <Tabs value={activeTab} onChange={handleTabChange} variant="outline" radius="lg" >
          <Tabs.List className="[&_button]:!text-lg font-semibold mb-5 [&_button[data-active='true']]:text-bright-sun-400" >
            <Tabs.Tab value="APPLIED">Applied</Tabs.Tab>
            <Tabs.Tab value="SAVED">Saved</Tabs.Tab>
            <Tabs.Tab value="OFFERED">Offered</Tabs.Tab>
            <Tabs.Tab value="INTERVIEWING">Interviewing</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={activeTab}>
            <div className='mt-10 flex flex-wrap gap-5 justify-between '>
              {
                loading ? (
                  <Text>Loading jobs...</Text>
                ) : showList.length > 0 ? (
                  showList.map((job: any, index: number) => <Card key={index} {...job} applied />)
                ) : (
                  <Text className="text-xl">No jobs found for this category.</Text>
                )
              }
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  )
}

export default JobHistory;
