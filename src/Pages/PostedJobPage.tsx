import { Divider } from "@mantine/core"
import PostedJob from "../PostedJob/PostedJob"
import PostedJobDesc from "../PostedJob/PostedJobDesc"

function PostedJobPage() {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] px-4 " >

      <div className="flex gap-5  " >
        <PostedJob />
        <PostedJobDesc />
      </div>
    </div>
  )
}

export default PostedJobPage