import { ActionIcon, TagsInput } from '@mantine/core';
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react';
import React, { useState } from 'react'
import { changeProfile } from '../../Slices/ProfileSlice1';
import { successNotification } from '../../Services/NotificationService';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mantine/hooks';

function Skills() {
    const matches = useMediaQuery('(max-width: 475px)');
    const dispatch = useDispatch();
    const [edit, setEdit] = useState(false);
    const profile = useSelector((state: any) => state.profile);
    const [about, setAbout] = useState("");
    const [skills , setSkills] = useState<string[]>([])
    const handleClick = () => {
        if (!edit) {
            setEdit(true);
            setSkills(profile.skills);
        } else {
            setEdit(false);
        }
    }
    const handleSave = () => {
        setEdit(false);
        let updatedProfile = { ...profile, skills:skills };
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Skills updated Successfully");
        console.log("Info form updated Profile :  ", updatedProfile);
    }
    return (
        <div className="px-3 ">
            <div className="text-2xl font-semibold mb-3 flex justify-between ">Skills  <div>
                {edit && <ActionIcon size={matches ?"md":"lg"} variant="subtle" color="green.8" onClick={handleSave} >
                    <IconCheck className=" h-4/5 w-4/5 " stroke={1.5} /> </ActionIcon>}

                <ActionIcon size={matches ?"md":"lg"} variant="subtle" color={edit ? "red.8" : "brightSun.4"} onClick={handleClick} >   {edit ? (
                    <IconX className=" h-4/5 w-4/5 " stroke={1.5} />) : (<IconPencil className="h-4/5 w-4/5" />)} </ActionIcon>
            </div>

            </div>

            {
                edit ? <TagsInput value={skills} onChange={setSkills} placeholder="Add skill" splitChars={[',', ' ', '|']} /> :
                    <div className="flex flex-wrap gap-2 ">
                        {
                            profile?.skills?.map((skill: any, index: number) => <div key={index} className="bg-bright-sun-300 rounded-3xl px-3 py-1
              text-sm font-medium bg-opacity-15 text-bright-sun-400 " > {skill} </div>)

                        }

                    </div>
            }

        </div>
    )
}

export default Skills
