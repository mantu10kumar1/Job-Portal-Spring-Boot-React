import { Divider } from '@mantine/core'
import SearchBar from '../FindJobs/SearchBar'
import Jobs from '../FindJobs/Jobs'

function FindJobsPage() {
    return (
        <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] " >
            <Divider size="sm" mx="md" />
            <SearchBar />
            <Divider size="xs" mx="md" />
            <Jobs/>
        </div>
    )
}

export default FindJobsPage