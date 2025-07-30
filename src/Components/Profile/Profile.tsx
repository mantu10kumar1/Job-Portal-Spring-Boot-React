import { ActionIcon, Divider, TagsInput, Textarea } from "@mantine/core";
import {
  IconBriefcase,
  IconDeviceFloppy,
  IconMapPin,
  IconPencil,
  IconPlus,
} from "@tabler/icons-react";
import ExpCard from "./ExpCard";
import CertiCard from "./CertiCard";
import { useEffect, useState } from "react";
import fields from "../../Data/Profile";
import { profile } from "../../Data/TalentData";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";
import SelectInput from "./SelectInput";
import { useSelector } from "react-redux";
import { getProfile } from "../../Services/ProfileService";


function Profile() {

  const select = fields;
  const user = useSelector((state:any)=> state.user);
  const profile = useSelector((state:any) =>state.profile);
  const [edit, setEdit] = useState([false, false, false, false, false]);
  const [about, setAbout] = useState('As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate about leveraging the latest technologies to solve complex problems and drive innovation. My goal is to create impactful software that enhances productivity and meets user needs effectively.');
  const [skills, setSkills] = useState(["HTML","CSS","JavaScript","React","Angular","Node.js","Python","Java","Ruby","PHP","SQL","MongoDB","PostgreSQL","Git","API Development","Testing and Debugging","Agile Methodologies","DevOps","AWS","Azure","Google Cloud"]);
  const [addExp , setAddExp] = useState(false);
  const [addCerti , setAddCerti] = useState(false);

  const handleEdit = (index: any) => {
    const newEdit = [...edit];
    newEdit[index] = !newEdit[index];
    setEdit(newEdit);
  };

  useEffect(() =>{
    console.log("Profile is : " , profile);
    getProfile(user.id).then((data:any) =>{
      console.log("Profile data : " , data );
    }).catch((error:any) =>{
      console.log("Error while getting profile : " , error)
    })
  },[])

  return (
    <div className=" w-4/5 mx-auto ">
      <div className=" relative ">
        <img className="rounded-t-2xl " src="/Profile/banner.jpg" alt="" />
        <img
          className=" w-48 h-48  rounded-full  -bottom-1/3 absolute left-3 border-mine-shaft-950 border-8 "
          src="/avatar.png"
          alt=""
        />
      </div>
      <div className="px-3 mt-16 ">
        <div className="text-3xl font-semibold flex justify-between ">
          {" "}
          Jarrwon wood
          <ActionIcon size="lg" variant="subtle" color="brightSun.4" onClick={() => handleEdit(0)} >   {edit[0] ? (
            <IconDeviceFloppy className=" h-4/5 w-4/5 " />) : (<IconPencil className="h-4/5 w-4/5" />)} </ActionIcon>
        </div>

        {edit[0] ? (
          <>
            {" "}
          
            <div className="flex gap-10 [&>*]:w-1/2 ">
              <SelectInput {...select[0]} />
              <SelectInput {...select[1]} />
            </div>
            <SelectInput {...select[2]} />
          </>
        ) : (
          <>
            <div className="text-xl flex gap-1 items-center  ">
              {" "}
              <IconBriefcase className="h-5 w-5  " stroke={1.5} /> Software Engineer{" "}
              &bull; Google{" "}
            </div>
          </>
        )}

        <div className=" flex  gap-1 text-lg items-center text-mine-shaft-300 ">
          <IconMapPin className="h-5 w-5  " stroke={1.5} />
         UK United State
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3 ">
        <div className="text-2xl font-semibold mb-3 flex justify-between ">About  <ActionIcon size="lg" variant="subtle" color="brightSun.4" 
        onClick={() => handleEdit(1)} >   {edit[1] ? (
          <IconDeviceFloppy className=" h-4/5 w-4/5 " />) : (<IconPencil className="h-4/5 w-4/5" />)} </ActionIcon></div>
        {edit[1] ? <Textarea autosize minRows={3}
          value={about}
          onChange={(event) => setAbout(event.currentTarget.value)}
        /> : <div className="text-sm text-mine-shaft-300 text-justify ">
          {about}
        </div>}


      </div>
      <Divider mx="xs" my="xl" />

      <div className="px-3 ">
        <div className="text-2xl font-semibold mb-3 flex justify-between ">Skills  <ActionIcon size="lg" variant="subtle" color="brightSun.4" onClick={() => handleEdit(2)} >   {edit[2] ? (
          <IconDeviceFloppy className=" h-4/5 w-4/5 " />) : (<IconPencil className="h-4/5 w-4/5" />)} </ActionIcon></div>

        {
          edit[2] ? <TagsInput value={skills} onChange={setSkills} placeholder="Add skill" splitChars={[',', ' ', '|']} /> :
            <div className="flex flex-wrap gap-2 ">
              {
                skills.map((skill: any, index: any) => <div key={index} className="bg-bright-sun-300 rounded-3xl px-3 py-1
           text-sm font-medium bg-opacity-15 text-bright-sun-400 " > {skill} </div>)

              }

            </div>
        }

      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3  ">
        <div className="text-2xl font-semibold mb-5 flex justify-between `">Experience <div className="flex gap-2 ">
          <ActionIcon size="lg" variant="subtle" color="brightSun.4" onClick={() => setAddExp(true)} >
            <IconPlus className="h-4/5 w-4/5" />
          </ActionIcon>

          <ActionIcon size="lg" variant="subtle" color="brightSun.4" onClick={() => handleEdit(3)} >   {edit[3] ? (
            <IconDeviceFloppy className=" h-4/5 w-4/5 " />) : (<IconPencil className="h-4/5 w-4/5" />)} </ActionIcon></div> </div>
        <div className="flex flex-col gap-8 ">
          {
          profile?.experience?.map((exp:any,  index:number) => (
            <ExpCard key={index} {...exp} edit={edit[3]} />
          ))
          }
        {addExp &&  <ExpInput add setEdit ={setAddExp} />}
        </div>
      </div>
      <Divider mx="xs" my="xl" />
      <div className="px-3 ">
        <div className="text-2xl font-semibold mb-5 flex justify-between ">Certifications <div className="flex gap-2 ">
          <ActionIcon size="lg" variant="subtle" color="brightSun.4" onClick={() => setAddCerti(true)} >
            <IconPlus className="h-4/5 w-4/5" />
          </ActionIcon>

          <ActionIcon size="lg" variant="subtle" color="brightSun.4" onClick={() => handleEdit(4)} >   {edit[4] ? (
            <IconDeviceFloppy className=" h-4/5 w-4/5 " />) : (<IconPencil className="h-4/5 w-4/5" />)} </ActionIcon></div>  </div>
        <div className="flex flex-col gap-8 ">
          {profile?.certifications?.map((certi:any, index:number) => 
            <CertiCard key={index} edit={edit[4]} {...certi} />
          )}
          {
            addCerti && <CertiInput setEdit={setAddCerti} />
          }
        </div>
      </div>
    </div>
  );
}

export default Profile;
