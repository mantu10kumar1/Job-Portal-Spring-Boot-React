import { Divider } from '@mantine/core'
import SearchBar from '../Components/FindTalent/SearchBar'
import Talents from '../Components/FindTalent/Talents'


function FindTalentPage() {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] " >
                <SearchBar/>
                <Divider size="sm" mx="md" />
                <Talents/>

    </div>
  )
}

export default FindTalentPage