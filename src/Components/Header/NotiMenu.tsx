
import { Indicator, Menu, Notification, Stack } from '@mantine/core';
import { IconBell, IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getNotifications, readNotifications } from '../../Services/NotiService';

function NotiMenu() {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user)
    type NotificationType = {
        id: number;
        userId: number;
        route: string;
        action: string;
        message: string;
        isRead?: boolean;
        // add other properties as needed
    };

    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    useEffect(() => {
        getNotifications(user?.id).then((res: any) => {
            console.log("Notifications data : ", res);
            setNotifications(res);
        }).catch((error: any) => {
            console.log("Error while getting notifications: ", error)
        });
    }, [user])

    const profile = useSelector((state: any) => state.profile)
    const [opened, setOpened] = useState(false);

    const unread = (index: number) => {
        let notis = [...notifications];
        notis = notis.filter((noti: any, i: number) => i !== index);
        setNotifications(notis);
        console.log("Notifications after unread: ", notis);

        console.log("Notification to be read: ", notifications[index].id);
        readNotifications(notifications[index].id).then((res: any) => {
            console.log("Read notification response: ", res);
        }).catch((error: any) => {
            console.log("Error while reading notification: ", error)
        });
    }

    return (
        <Menu shadow="md" width={400} opened={opened} onChange={setOpened}>
            <Menu.Target>
                <div className="bg-mine-shaft-900 p-1.5 rounded-full  ">

                    <Indicator disabled={notifications.length<=0 } color="brightSun.4" offset={6} size={8} processing>
                        <IconBell stroke={1.5} />
                    </Indicator>

                </div>
            </Menu.Target>

            <Menu.Dropdown onChange={() => setOpened(true)}>

                <div className='flex flex-col gap-1' >
                    {
                        notifications?.map((noti: any, index: number) => <Notification key={index}
                            onClick={() => {
                                navigate(noti.route);
                                unread(index);
                                setOpened(false);
                            }}
                            className='hover:bg-mine-shaft-900 cursor-pointer' onClose={() => unread(index)}
                            icon={<IconCheck size={20} />}
                            title={noti.action} mt="md">

                            {noti.message}
                        </Notification>)
                    }
                    {
                        notifications?.length === 0 && <div className='text-center text-mine-shaft-300' >
                          No  Notifications
                        </div>
                    }


                </div>



            </Menu.Dropdown>
        </Menu>
    )
}

export default NotiMenu
