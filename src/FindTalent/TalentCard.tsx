import { Avatar, Button, Divider, Text } from '@mantine/core'
import { IconBookmark, IconClockHour3, IconHeart, IconMapPin } from '@tabler/icons-react'
import React from 'react'
import { Link } from 'react-router-dom';

function TalentCard(props: any) {
    console.log("props : ", props);
    return (
        <div className='bg-mine-shaft-900 p-4 w-[450px] flex flex-col gap-3 rounded-xl
        hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 '>
            <div className='flex justify-between  '>
                <div className='flex gap-2 items-center '>
                    <div className='p-2 bg-mine-shaft-800 rounded-full  '>
                        <Avatar size="lg" src={`/${props.image}.png`} alt="ms" />
                    </div>

                    <div>
                        <div className='font-semibold text-lg '  >{props.name}</div>
                        <div className='text-sm text-mine-shaft-300 '>{props.role} &bull; {props.company} </div>
                    </div>
                </div>
                <IconHeart className='text-mine-shaft-300 cursor-pointer ' stroke={1.5} />
            </div>
            <div className='flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400 [&>div]:rounded-lg text-xs '>
                {
                    props.topSkills?.map((skill:any , index:any) => <div key={index} className='p-2 py-1  bg-mine-shaft-800text-bright-sun-400 rounded-lg text-xs '>{skill}</div>)
                }
               
            </div>
            <div>
                <Text className="!text-xs text-justify !text-mine-shaft-300  " lineClamp={3}>
                    {props.about}
                </Text>
            </div>
            <Divider size="xs" color="mineShaft.7" />
            <div className='flex justify-between '>
                <div className='font-semibold text-mine-shaft-200 '>
                    {props.expectedCtc}
                </div>
                <div className=' flex  gap-1 text-xs items-center text-mine-shaft-400 '>
                    <IconMapPin className='h-5 w-5  ' stroke={1.5} /> {props.location}
                </div>
            </div>
            <Divider size="xs" color="mineShaft.7" />
            <div className='flex  [&>*]:w-1/2  [&>*]:p-1 '>
                <Link to="/talent-profile">
                    <Button color="brightSun.4" variant="outline" fullWidth>Profile</Button>
                </Link>
                <div>
                    <Button color="brightSun.4"  variant="light" fullWidth>Message</Button>

                </div>

            </div>
        </div>
    )
}

export default TalentCard