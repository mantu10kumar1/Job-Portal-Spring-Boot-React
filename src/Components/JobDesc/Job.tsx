import { ActionIcon, Button, Divider } from '@mantine/core'
import { IconBookmark } from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify';
import { card, desc, skills } from '../../Data/JobDescData';
import { timeAgo } from '../../Services/Utilities';

function Job(props: any) {
  const data = DOMPurify.sanitize(props.description);
  console.log("props in Job : ", props);

  return (
    <div className='w-2/3'>
      <div className='flex justify-between mb-3  '>
        <div className='flex gap-2 items-center '>
          <div className='p-3 bg-mine-shaft-800 rounded-xl  '>
            <img className=' h-14 ' src={`/Icons/${props.company}.png`} alt="ms" />
          </div>

          <div className='flex flex-col gap-1'>
            <div className='font-semibold text-2xl' >{props.jobTitle}</div>
            <div className='text-lg text-mine-shaft-300 '>{props.company} &bull; {timeAgo(props.postTime)} &bull;
              {props.applicants ? props.applicants.length : 0} Applicants
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-2 items-center '>
          <Link to={`/apply-job/${props.id}`}>
            <Button color="brightSun.4" size="sm" variant="light" >{props.edit ? "Edit" : "Apply"}</Button>
          </Link>
          {props.edit ? <Button color="red.5" size="sm" variant="outline" >Delete</Button> : <IconBookmark className='cursor-pointer text-bright-sun-400  ' stroke={1.5} />}
        </div>
      </div>
      <Divider my="xl" />
      <div className='flex justify-between '>

        {
          card.map((item: any, index: any) => <div key={index} className='flex flex-col items-center gap-1'>
            <ActionIcon color='brightSun.4' className='!h-12 !w-12 ' variant="light" radius="lg" aria-label="Settings">
              <item.icon className='h-4/5 w-4/5  ' stroke={1.5} />
            </ActionIcon>
            <div className='text-sm text-mine-shaft-300'>{item.name}</div>
            <div className='font-semibold'>{props ? props[item.id] : "Na"} {item.id == "packageOffered" && <>LPA</> } </div>
          </div>)
        }
      </div>
      <Divider my="xl" />
      <div>
        <div className='text-xl font-semibold mb-5'>Required Skills</div>
        <div className='flex flex-wrap gap-2'>
          {
            props?.skillsRequired?.map((skill:any, index:number) => <ActionIcon key={index} color='brightSun.4' className='!h-fit !w-fit !text-sm font-medium '
             p="xs" variant="light" radius="lg" aria-label="Settings">
              {skill}
            </ActionIcon>)
          }
        </div>
      </div>
      <Divider my="xl" />
      <div className='[&_h4]:text-xl [&_*]:text-mine-shaft-300 [&_h4]:my-5 [&_h4]:font-semibold
       [&_h4]:text-mine-shaft-200 [&_p]:text-justify [&_li]:marker:text-bright-sun-400 [&_li]:mb-1  '
        dangerouslySetInnerHTML={{ __html: data }}>
      </div>
      <Divider my="xl" />
      <div>
        <div className='text-xl font-semibold mb-5'>About the Company</div>
        <div className='flex justify-between  '>
          <div className='flex gap-2 items-center '>
            <div className='p-3 bg-mine-shaft-800 rounded-xl  '>
              <img className=' h-8 ' src={`/Icons/${props.company}.png`} alt="ms" />
            </div>

            <div className='flex flex-col'>
              <div className='font-medium text-lg' >{props.company}</div>
              <div className=' text-mine-shaft-300 '>10K+ Employees</div>
            </div>
          </div>
          <Link to={`/company/${props.company}`}>
            <Button color="brightSun.4" variant="light" >Company Page</Button>
          </Link>
        </div>
      </div>
      <div className='text-mine-shaft-300 text-justify'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magni ullam maiores
         quia, ratione sequi debitis, corrupti, ex quae fugit accusamus eaque in aspernatur. Harum et accusamus amet dolorum est quaerat
          voluptatum laudantium dicta facere, nulla magnam, facilis ipsa sint minima.</div>

    </div>
  )
}

export default Job