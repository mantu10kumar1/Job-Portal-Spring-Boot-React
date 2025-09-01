import { Button } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../Components/TalentProfile/Profile";
import RecommendedTalet from "../Components/TalentProfile/RecommendedTalet";
import { useEffect, useState } from "react";
import { getAllProfiles } from "../Services/ProfileService";


function TalentProfilePage() {
  const navigate = useNavigate();
  const [talents , setTalents] = useState<any[]>([]);
  useEffect(() => {
    window.scrollTo(0, 0);
    getAllProfiles().then((res) => {
      setTalents(res);
    }).catch((err) => {
      console.log("Error while getting all profiles : ", err);
    });
  }, []);


  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] p-4 " >
                    <Button my="md" onClick={() => navigate(-1)} leftSection={<IconArrowLeft size={20} />} color="brightSun.4" 
                    variant="light" >Back</Button>

                <div className="flex gap-5 lg-mx:flex-wrap " >
                  <Profile/>
                  <RecommendedTalet talents={talents} />
                </div>
    </div>
  )
}

export default TalentProfilePage;