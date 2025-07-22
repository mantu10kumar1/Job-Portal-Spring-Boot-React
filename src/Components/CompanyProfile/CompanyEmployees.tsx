import TalentCard from '../FindTalent/TalentCard'
import { talents } from '../../Data/TalentData'

function CompanyEmployees() {
    return (
        <div className='mt-10 flex flex-wrap gap-10 '>
            {
                talents.map((talent, index) => index < 6 && <TalentCard key={index} {...talent} />
                )
            }
        </div>
    )
}

export default CompanyEmployees