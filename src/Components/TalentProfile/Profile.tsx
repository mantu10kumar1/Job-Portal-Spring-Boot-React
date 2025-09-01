import { Avatar, Button, Divider } from '@mantine/core'
import { IconBriefcase, IconMapPin } from '@tabler/icons-react'
import ExpCard from './ExpCard'
import CertiCard from './CertiCard'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getProfile } from '../../Services/ProfileService'

function Profile() {
  const {id} = useParams();
  const [profile , setProfile] = useState<any>({});


  useEffect(() => {
    window.scrollTo(0, 0);
    getProfile(id).then((res) => {
      setProfile(res);
    }).catch((err) => {
      console.log("Error while getting profile : ", err);
    });
  }, [id]);

  console.log("Profile data in Talent Profile : ", profile);

  return (
    <div className=' w-2/3 lg-mx:w-full '>
      <div className=' relative ' >
          <img className="rounded-t-2xl xs-mx:h-32 w-full " src="/Profile/banner.jpg" alt="" />
                 <div
                   className="absolute flex items-center justify-center -bottom-1/3  md-mx:-buttom-10 sm-mx:-buttom-16 left-6 "
                 >
                   <Avatar
                     className="!w-48 !h-48 border-l-mine-shaft-950 border-8 rounded-full   md-mx:!w-40 md-mx:!h-40 xs-mx:!w-20 xs-mx:!h-20 "
                     src={profile?.picture ? `data:image/png;base64,${profile?.picture}` :"/avatar.png"}
                     alt="avatar"
                   />
      </div>
      </div>
      <div className='px-3 mt-16 ' >
        <div className='text-3xl font-semibold flex justify-between xs-mx:text-2xl  '> {profile?.name}
           <Button color="brightSun.4" variant="light" 
         >Message</Button> </div>
        <div className='text-xl flex gap-1 items-center  ' > <IconBriefcase className='h-5 w-5  ' stroke={1.5} /> {profile?.jobTitle} 
        &bull; {profile?.company} </div>
        <div className=' flex  gap-1 text-lg items-center text-mine-shaft-300 '>
          <IconMapPin className='h-5 w-5  ' stroke={1.5} />{profile?.location}
        </div>
        <div className=' flex  gap-1 text-lg items-center text-mine-shaft-300 '>
          <IconBriefcase className='h-5 w-5  ' stroke={1.5} /> Experience :  {profile?.totalExp} Years
        </div>
      </div>
      <Divider mx='xs' my='xl' />
      <div className='px-3 '>
        <div className='text-2xl font-semibold mb-3 '>About</div>
        <div className='text-sm text-mine-shaft-300 text-justify xs-mx:text-xs '>
          {profile?.about}
        </div>
      </div>
      <Divider mx='xs' my='xl' />

      <div className='px-3 '>
        <div className='text-2xl font-semibold mb-3 '>Skills</div>
        <div className='flex flex-wrap gap-2 xs-mx:text-xs'>
          {
            profile?.skills?.map((skill: any, index: any) => <div key={index} className='bg-bright-sun-300  bg-opacity-15 text-sm font-medium rounded-3xl text-bright-sun-400 px-3 py-1 '>{skill}</div>)
          }
        </div>
      </div>
      <Divider mx='xs' my='xl' />
      <div className='px-3  '>
        <div className='text-2xl font-semibold mb-5 '>Experience</div>
        <div className='flex flex-col gap-8 xs-mx:text-xs '>
          {
            profile?.experience?.map((exp: any, index: any) => <ExpCard key={index} {...exp} />)
          }
        </div>


      </div>
      <Divider mx='xs' my='xl' />
      <div className='px-3 '>
        <div className='text-2xl font-semibold mb-5 '>Certifications </div>
          <div className='flex flex-col gap-8 xs-mx:text-xs '>
          {
            profile?.certification?.map((certi: any, index: any) => <CertiCard key={index} {...certi} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Profile