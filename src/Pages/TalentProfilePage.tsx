import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Profile from "../Components/TalentProfile/Profile";
import RecommendedTalet from "../Components/TalentProfile/RecommendedTalet";
import { profile } from "../Data/TalentData";


function TalentProfilePage() {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4 " >
               <Link className="my-5 inline-block " to="/find-talent">
                    <Button leftSection={<IconArrowLeft size={20} />} color="brightSun.4" variant="light" >Back</Button>
                </Link>

                <div className="flex gap-5 " >
                  <Profile {...profile}/>
                  <RecommendedTalet/>
                </div>
    </div>
  )
}

export default TalentProfilePage;