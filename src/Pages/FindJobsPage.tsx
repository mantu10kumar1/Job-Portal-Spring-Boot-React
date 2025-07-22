import { Divider } from '@mantine/core'
import SearchBar from '../Components/FindJobs/SearchBar'
import Jobs from '../Components/FindJobs/Jobs'

function FindJobsPage() {
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] " >
            <SearchBar />
            <Divider size="xs" mx="md" />
            <Jobs/>
        </div>
    )
}

export default FindJobsPage