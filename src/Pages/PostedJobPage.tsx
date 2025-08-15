import { useNavigate, useParams } from "react-router-dom";
import PostedJob from "../Components/PostedJob/PostedJob"
import PostedJobDesc from "../Components/PostedJob/PostedJobDesc"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getJobPosted } from "../Services/JobService";

function PostedJobPage() {
  const { id } = useParams();
  // const id = parseInt(id,10);
  const navigate = useNavigate();
  const user = useSelector((state: any) => state.user);
  const [jobList , setJobList] = useState<any[]>([])
  const [job , setJob] = useState<any>({});
  // useEffect(() =>{
  //   window.scrollTo(0,0);
  //   getJobPosted(user.id).then((res) => {
  // // console the value of id and id in res
  //     console.log("Id in postedJobPage : " , id);
  //     console.log("Id in res : " , res.find((item:any) => console.log(item.id)));
  //     console.log("Id comparison in res : " , res.find((item:any) => item.id === id))
  //     console.log("Res " , res);
  //     setJobList(res);
  //     setJob(res.find((item:any) => item.id === id));
  //   })
  //   .catch(err => console.log("Error while fetching job by id : ", err))

  // },[id]);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Only run the logic if 'id' is defined
    if (id) {
        getJobPosted(user.id)
            .then((res) => {
                const numericId = parseInt(id, 10);
                setJobList(res);
                if(res && res.length > 0 && Number(id)===0 ) navigate(`/posted-job/${res[0].id}`)
                setJob(res.find((item: any) => item.id === numericId));
            })
            .catch(err => console.log("Error while fetching job by id: ", err));
    }
}, [id]);

  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4 " >

      <div className="flex gap-5  " >
        <PostedJob job={job} jobList={jobList} />
        <PostedJobDesc {...job} />
      </div>
    </div>
  )
}

export default PostedJobPage