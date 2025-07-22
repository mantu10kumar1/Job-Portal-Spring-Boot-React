import { Avatar, Button, Divider, Modal, Text } from '@mantine/core'
import { DateInput, TimeInput } from '@mantine/dates';
//@ts-ignore
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarMonth, IconHeart, IconMapPin } from '@tabler/icons-react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom';

function TalentCard(props: any) {
    const [opened, { open, close }] = useDisclosure(false);
    const [value, setValue] = useState<Date | null>(null);
    const ref = useRef<HTMLInputElement>(null);
    // console.log("Talent card props data : ", props);
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
                    props.topSkills?.map((skill: any, index: any) => <div key={index} className='p-2 py-1  bg-mine-shaft-800text-bright-sun-400 rounded-lg text-xs '>{skill}</div>)
                }

            </div>
            <div>
                <Text className="!text-xs text-justify !text-mine-shaft-300  " lineClamp={3}>
                    {props.about}
                </Text>
            </div>
            <Divider size="xs" color="mineShaft.7" />
            {
                props.invited ? <div>
                    <IconCalendarMonth stroke={1.5} /> Interview: August 27, 2024 10:00 AM
                </div> : <div className='flex justify-between '>
                    <div className='font-semibold text-mine-shaft-200 '>
                        {props.expectedCtc}
                    </div>
                    <div className=' flex  gap-1 text-xs items-center text-mine-shaft-400 '>
                        <IconMapPin className='h-5 w-5  ' stroke={1.5} /> {props.location}
                    </div>
                </div>
            }

            <Divider size="xs" color="mineShaft.7" />
            <div className='flex  [&>*]:w-1/2  [&>*]:p-1 '>
                {!props.invited && <> <Link to="/talent-profile">
                    <Button color="brightSun.4" variant="outline" fullWidth>Profile</Button>
                </Link>
                    <div>
                        {props.posted ? <Button onClick={open} rightSection={<IconCalendarMonth className='w-5 h-5' />} color="brightSun.4" variant="light" fullWidth>Schedule</Button>
                            : <Button color="brightSun.4" variant="light" fullWidth>Message</Button>}
                    </div></>
                }
                {
                    props.invited && <> 
                    <div>
                    <Button color="brightSun.4" variant="outline" fullWidth>Accept</Button>
                    </div>
                    <div>
                    <Button color="brightSun.4" variant="light" fullWidth>Reject</Button>
                    </div>
                    </>
                }

            </div>
            <Modal opened={opened} onClose={close} title="Schedule Interview" centered>
                <div className='flex flex-col gap-4'>
                    <DateInput
                        value={value} minDate={new Date()} onChange={(val: any) => setValue(val ? new Date(val) : null)} label="Date" placeholder="Enter Date" />
                    <TimeInput label="Time" ref={ref} onClick={() => ref.current?.showPicker()} />
                    <Button color="brightSun.4" variant="outline" fullWidth>Schedule</Button>
                </div>

            </Modal>
        </div>
    )
}

export default TalentCard