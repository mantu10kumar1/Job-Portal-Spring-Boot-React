import { useParams } from 'react-router-dom'
import { talents } from '../../Data/TalentData'
import TalentCard from '../FindTalent/TalentCard'

function RecommendedTalet(props:any) {
  const {id} = useParams();
  // Filter out the current talent from the recommendations
  const filteredTalents = props?.talents?.filter((talent:any) => talent.id !== id);
  
  return ( <div>
        <div className='text-xl font-semibold mb-5  '>RecommendedTalet</div>
        <div className='flex flex-col flex-wrap gap-5 '>
            {
                props?.talents?.map((talent:any , index:any) => index <4 && id!=talent.id && <TalentCard key={index} {...talent} /> )
            }
        </div>

    </div>
  )
}

export default RecommendedTalet