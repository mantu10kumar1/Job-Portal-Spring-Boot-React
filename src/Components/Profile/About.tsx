import { ActionIcon, Textarea } from '@mantine/core';
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice1';
import { successNotification } from '../../Services/NotificationService';

function About() {
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const [about, setAbout] = useState("");
    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setAbout(profile.about);
        } else {
            setEdit(false);
        }
    }
    const handleSave = () => {
        setEdit(false);
        let updatedProfile = { ...profile, about: about };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "About updated Successfully");
        console.log("Info form updated Profile :  ", updatedProfile);
    }
    return (
        <div className="px-3 ">
            <div className="text-2xl font-semibold mb-3 flex justify-between ">About   <div>
                {edit && <ActionIcon size="lg" variant="subtle" color="green.8" onClick={handleSave} >
                    <IconCheck className=" h-4/5 w-4/5 " stroke={1.5} /> </ActionIcon>}

                <ActionIcon size="lg" variant="subtle" color={edit ? "red.8" : "brightSun.4"} onClick={handleClick} >   {edit ? (
                    <IconX className=" h-4/5 w-4/5 " stroke={1.5} />) : (<IconPencil className="h-4/5 w-4/5" />)} </ActionIcon>
            </div>
            </div>
            {edit ? <Textarea autosize minRows={3}
                value={about}
                onChange={(event) => setAbout(event.currentTarget.value)}
            /> : <div className="text-sm text-mine-shaft-300 text-justify ">
                {profile?.about}
            </div>}


        </div>
    )
}

export default About
