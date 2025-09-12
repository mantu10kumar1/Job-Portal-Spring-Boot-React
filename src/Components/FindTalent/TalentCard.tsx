import { Avatar, Button, Divider, Modal, Text } from '@mantine/core'
import { DateInput, TimeInput } from '@mantine/dates';
//@ts-ignore
import { useDisclosure } from '@mantine/hooks';
import { IconCalendarMonth, IconHeart, IconMapPin } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { getProfile } from '../../Services/ProfileService';
import { changeAppStatus } from '../../Services/JobService';
import { errorNotification, successNotification } from '../../Services/NotificationService';
import { formatInterviewTime, openBase64PDF } from '../../Services/Utilities';
import { stat } from 'fs';

function TalentCard(props: any) {
    console.log("Props in TalentCard : ", props);
    const { id } = useParams();
    const [opened, { open, close }] = useDisclosure(false);
    const [app, { open: openApp, close: closeApp }] = useDisclosure(false);
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<any>(null);
    const ref = useRef<HTMLInputElement>(null);
    const [profile, setProfile] = useState<any>({});

    useEffect(() => {
        if (props.applicantId) getProfile(props.applicantId).then((res) => {
            setProfile(res);
        }).catch((err) => {
            console.log("Occured error while getting profile in TalentCard : ", err);
        })
        else setProfile(props)
    }, [props])

    console.log("profile in TalentCard : ", profile);

    const handleOffer = (status: string) => {
        if (!time === null ) {
            errorNotification("Error", "Please select date and time for interview");
            return;
        } else {
            console.log("status : ", status);
            let interview: any = { id, applicantId: profile?.id, applicationStatus: status };
            if (status === "INTERVIEWING") {
                const [hours, minutes] = time.split(":").map(Number);
                date?.setHours(hours, minutes);
                interview = { ...interview, interviewTime: date }
            }

            changeAppStatus(interview).then((res) => {
                if (status === "INTERVIEWING") successNotification("Interviewing Scheduled", "Interview Scheduled Successfully");
                else if (status === "OFFERED") successNotification("Offer Sent", "Offer Sent Successfully");
                else successNotification("Offer Rejected", "Offer Rejected Successfully");
                window.location.reload();
            }).catch((err) => {
                console.log("Occured an error while channging app status : ", err);
                errorNotification("Error", err.response.data.errorMessage)
            })
        }

    }
    return (
        <div className='bg-mine-shaft-900 p-1 w-96 flex flex-col gap-3 rounded-xl  xs-mx:w-full
        hover:shadow-[0_0_5px_1px_yellow] !shadow-bright-sun-400 bs-mx:w-[100%] md-mx:w-full '>
            <div className='flex justify-between  '>
                <div className='flex gap-2 items-center '>
                    <div className='p-2 bg-mine-shaft-800 rounded-full  '>
                        <Avatar size="lg" src={profile?.picture ? `data:image/png;base64,${profile?.picture}` : "/avatar.png"} alt="ms" />
                    </div>

                    <div>
                        <div className='font-semibold text-lg '  >{props.name}</div>
                        <div className='text-sm text-mine-shaft-300 '>{profile?.jobTitle} &bull; {profile?.company} </div>
                    </div>
                </div>
                <IconHeart className='text-mine-shaft-300 cursor-pointer ' stroke={1.5} />
            </div>
            <div className='flex gap-2 [&>div]:py-1 [&>div]:px-2 [&>div]:bg-mine-shaft-800 [&>div]:text-bright-sun-400
             [&>div]:rounded-lg text-xs flex-wrap '>
                {
                    profile?.skills?.map((skill: any, index: any) => index < 4 && <div key={index} className='p-2 py-1  
                    bg-mine-shaft-800text-bright-sun-400 rounded-lg text-xs '>{skill}</div>)
                }

            </div>
            <div>
                <Text className="!text-xs text-justify !text-mine-shaft-300  " lineClamp={3}>
                    {profile.about}
                </Text>
            </div>
            <Divider size="xs" color="mineShaft.7" />
            {
                props.invited ? <div>
                    <IconCalendarMonth stroke={1.5} /> Interview: {formatInterviewTime(props.interviewTime)}
                </div> : <div className='flex justify-between '>
                    <div className=' text-mine-shaft-300 '>
                        Exp : {props.totalExp ? props.totalExp : 1} {props.totalExp > 1 ? "Years" : "Year"}
                    </div>
                    <div className=' flex  gap-1 text-xs items-center text-mine-shaft-400 '>
                        <IconMapPin className='h-5 w-5  ' stroke={1.5} /> {profile.location}
                    </div>
                </div>
            }

            <Divider size="xs" color="mineShaft.7" />
            <div className='flex  [&>*]:w-1/2  [&>*]:p-1 '>
                {!props.invited && <> <Link to={`/talent-profile/${profile?.id}`} >
                    <Button color="brightSun.4" variant="outline" fullWidth>Profile</Button>
                </Link>

                    {/* <Modal opened={opened} onClose={close} radius="lf" title="Schedule Interview" centered> */}
                    <div className='flex flex-col gap-4'>
                        <DateInput
                            value={date}
                            onChange={(value: string | null) => setDate(value ? new Date(value) : null)}
                            minDate={new Date()}
                            label="Date"
                            placeholder='Enter Date'
                        />

                        <TimeInput value={time} onChange={(event: any) => setTime(event.currentTarget.value)} label="Time" ref={ref}
                            minTime='' onClick={() => ref.current?.showPicker()} />
                        <Button onClick={() => handleOffer("INTERVIEWING")} color="brightSun.4" variant="outline" fullWidth>Schedule</Button>

                    </div>
                    {/* </Modal> */}

                  

                </>
                }
                {
                    props.invited && <>
                        <div>
                            <Button color="brightSun.4" onClick={() => handleOffer("OFFERED")} variant="outline" fullWidth>Accept</Button>
                        </div>
                        <div>
                            <Button color="brightSun.4" onClick={() => handleOffer("REJECTED")} variant="light" fullWidth>Reject</Button>
                        </div>
                    </>
                }

            </div>
            {(props.invited || props.posted) && <Button color="brightSun.4" variant="filled" fullWidth onClick={openApp} autoContrast>
                View Application</Button>}
            <Modal opened={app} onClose={closeApp} radius="lf" title="Application" centered>
                <div className='flex flex-col gap-4'>
                    <div>
                        Email: &emsp;<a className=' text-bright-sun-400 hover:underline cursor-pointer text-center '
                            href={`mailto:${props?.email}`}>{props?.email} </a>
                    </div>
                    <div>
                        Website: &emsp;<a target='_blank' className=' text-bright-sun-400 hover:underline cursor-pointer text-center '
                            href={`mailto:${props?.website}`}>{props?.website} </a>
                    </div>
                    <div>
                        Resume: &emsp;<span className=' text-bright-sun-400 hover:underline cursor-pointer text-center '
                            onClick={() => openBase64PDF(props?.resume)}>{props?.name} </span>
                    </div>
                    <div>
                        Cover Letter: &emsp;<div >{props?.coverLetter} </div>
                    </div>
                    {/* <DateInput
                        value={date}
                        minDate={new Date()}
                        onChange={(value) => setDate(value ? new Date(value) : null)}
                        label="Date"
                        placeholder="Enter Date"
                    />
                    <TimeInput value={time} onChange={(event:any)=>setTime(event.currentTarget.value)} label="Time" ref={ref}
                     minTime='' onClick={() => ref.current?.showPicker()}  />
                    <Button onClick={()=>handleOffer("INTERVIEWING")} color="brightSun.4" variant="outline" fullWidth>Schedule</Button>
                */}
                </div>

            </Modal>
        </div>
    )
}

export default TalentCard