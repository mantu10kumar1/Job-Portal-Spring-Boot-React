import { useState } from 'react'
import fields from '../../Data/Profile';
import { IconBriefcase, IconCheck, IconMapPin, IconPencil, IconX } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import SelectInput from './SelectInput';
import { useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice1';
import { successNotification } from '../../Services/NotificationService';

function Info() {
  const select = fields;
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const profile = useSelector((state: any) => state.profile);

  const form = useForm({
    mode: 'controlled',
    initialValues: { jobTitle: '', company: '', location: '' },
  });


  const [edit, setEdit] = useState(false);
  const handleClick = () => {
    if (!edit) {
      setEdit(true);
      form.setValues({ jobTitle: profile.jobTitle, company: profile.company, location: profile.location });
    } else {
      setEdit(false);
    }
  }
  const handleSave = () => {
    setEdit(false);
    let updatedProfile = { ...profile, ...form.getValues() };
    dispatch(changeProfile(updatedProfile));
    successNotification("Success", "Profile updated Successfully");
    console.log("Info form updated Profile :  ", updatedProfile);
  }
  return (
    <>
      <div className="text-3xl font-semibold flex justify-between ">
        {" "}
        {user.name}
        <div>
          {edit && <ActionIcon size="lg" variant="subtle" color="green.8" onClick={handleSave} >
            <IconCheck className=" h-4/5 w-4/5 " stroke={1.5} /> </ActionIcon>}

          <ActionIcon size="lg" variant="subtle" color={edit?"red.8" : "brightSun.4"} onClick={handleClick} >   {edit ? (
            <IconX className=" h-4/5 w-4/5 " stroke={1.5} />) : (<IconPencil className="h-4/5 w-4/5" />)} </ActionIcon>
        </div>
      </div>

      {edit ? (
        <>
          {" "}

          <div className="flex gap-10 [&>*]:w-1/2 ">
            <SelectInput form={form} name="jobTitle" {...select[0]} />
            <SelectInput form={form} name="company" {...select[1]} />
          </div>
          <SelectInput form={form} name="location" {...select[2]} />
        </>
      ) : (
        <>
          <div className="text-xl flex gap-1 items-center  ">
            {" "}
            <IconBriefcase className="h-5 w-5  " stroke={1.5} />{profile.jobTitle} {" "}
            &bull;{profile.company} {" "}
          </div>
        </>
      )}

      <div className=" flex  gap-1 text-lg items-center text-mine-shaft-300 ">
        <IconMapPin className="h-5 w-5  " stroke={1.5} />
        {profile.location}
      </div>
    </>
  )
}

export default Info
