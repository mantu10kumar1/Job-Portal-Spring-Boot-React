import { Link, useParams } from "react-router-dom"
import { timeAgo } from "../../Services/Utilities";

function PostedJobCard(props:any) {
  const {id} = useParams();
  const parsedId = parseInt(id as string);
  
 
  return (
    <Link to={`/posted-job/${props.id}`} className={` rounded-xl p-2 border-l-4 border-l-bright-sun-400 md-mx:w-full
    ${props.id === parsedId? "bg-bright-sun-400 text-black":"bg-mine-shaft-900 text-mine-shaft-300" } `} >
        <div className='text-sm font-semibold '>{props.jobTitle} </div>
        <div className='text-xs  font-medium'>{props.location}</div>
        <div className='text-xs '>Posted {timeAgo(props.postTime)}</div>
    </Link>
  )
}

export default PostedJobCard