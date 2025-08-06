import { Button, FileInput, LoadingOverlay, NumberInput, Textarea, TextInput } from '@mantine/core'
import { isNotEmpty, useForm } from '@mantine/form';
import { IconPaperclip } from '@tabler/icons-react';
import React, { useState } from 'react'
import { getBase64 } from '../../Services/Utilities';
import { useParams } from 'react-router-dom';
import { applyJob } from '../../Services/JobService';
import { errorNotification, successNotification } from '../../Services/NotificationService';

function ApplicationForm() {
    const {id} = useParams();
     const [preview, setPreview] = useState(false);
        const [submit, setSubmit] = useState(false);
        const handlePreview = () => {
            form.validate();
            window.scrollTo({ top: 0, behavior: 'smooth' })
            if (!form.isValid()) return;
            setPreview(!preview);
        }
        const handleSubmit = async() => {
           setSubmit(true);
           let resume:any = await getBase64(form.getValues().resume);
           let applicant = {...form.getValues(), resume: resume.split(',')[1]}
           console.log("Applicant : ", applicant);
           applyJob(id,applicant)
           .then((res) =>{
            setSubmit(false);
            successNotification("Success","Application submitted Successfully");
           })
           .catch((error) =>{
            setSubmit(false);
            errorNotification("Error" , error.response.data.message);
           })

        }
    const form = useForm({
           mode: 'controlled',
           validateInputOnChange: true,
           initialValues:  {
               name: '',
               email: '',
               phone: '',
               website: '',
               resume: '',
               coverLetter: '',
              
           } ,
           validate: {
               name: isNotEmpty("Name is required"),
               email: isNotEmpty("Email is required"),
               phone: isNotEmpty("Phone is required"),
               website: isNotEmpty("Website is required"),
               resume: isNotEmpty("Resume is required"),
               coverLetter: isNotEmpty("Cover Letter is required"),
              
           }
       });
    return (
        <div>
            <LoadingOverlay className='!fixed '
                visible={submit}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'brightSun.4', type: 'bars' }}
            />
            <div className='text-xl font-semibold mb-5'>Submit Your Application</div>
            <div className='flex flex-col gap-5'>
                <div className='flex gap-10 [&>*]:w-1/2 '>
                    <TextInput {...form.getInputProps("name")} readOnly={preview} variant={preview ? "unstyled" : "default"}
                        className={`${preview ? "text-mine-shaft-200 font-semibold " : ""}`} label="Full Name" withAsterisk placeholder="Enter Name" />
                    <TextInput {...form.getInputProps("email")} readOnly={preview} variant={preview ? "unstyled" : "default"}
                        className={`${preview ? "text-mine-shaft-200 font-semibold " : ""}`} label="Email " withAsterisk placeholder="Enter email" />
                </div>
                <div className='flex gap-10 [&>*]:w-1/2 '>
                    <NumberInput  {...form.getInputProps("phone")} readOnly={preview} variant={preview ? "unstyled" : "default"}
                        className={`${preview ? "text-mine-shaft-200 font-semibold " : ""}`} label="Phone Number" withAsterisk placeholder="Enter Phone Number" hideControls
                        min={0} max={9999999999} clampBehavior='strict' />
                    <TextInput {...form.getInputProps("website")} readOnly={preview} variant={preview ? "unstyled" : "default"}
                        className={`${preview ? "text-mine-shaft-200 font-semibold " : ""}`} label="Personal Website " withAsterisk placeholder="Enter Url" />
                </div>
                <FileInput {...form.getInputProps("resume")} accept='applicatioin/pdf' readOnly={preview} 
                variant={preview ? "unstyled" : "default"}
                    className={`${preview ? "text-mine-shaft-200 font-semibold " : ""}`} withAsterisk leftSection={<IconPaperclip 
                        stroke={1.5} />} label="Resume/CV"
                    placeholder="Attcha Resume/CV" leftSectionPointerEvents="none" />
                <Textarea {...form.getInputProps("coverLetter")} readOnly={preview} variant={preview ? "unstyled" : "default"}
                    className={`${preview ? "text-mine-shaft-200 font-semibold " : ""}`} withAsterisk placeholder="Write something about yourself..." label="Cover Letter"
                    autosize minRows={4}
                />
                {!preview && <Button onClick={handlePreview} color="brightSun.4" variant="light" >Preview</Button>}
                {
                    preview && <div className='flex gap-10 [&>*]:w-1/2'>
                        <Button fullWidth onClick={handlePreview} color="brightSun.4" variant="outline" >Edit</Button>
                        <Button fullWidth onClick={handleSubmit} color="brightSun.4" variant="light" >Submit</Button>
                    </div>
                }
            </div>

        </div>
    )
}

export default ApplicationForm
