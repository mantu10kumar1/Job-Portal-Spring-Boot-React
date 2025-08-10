import SelectInput from './SelectInput'
import { Button, NumberInput, TagsInput, Textarea } from '@mantine/core';
import TextEditor from './RichTextEditor';
import { content, fields } from '../../Data/PostJob';
import { isNotEmpty, useForm } from '@mantine/form';
import { skills } from '../../Data/JobDescData';
import { postJob } from '../../Services/JobService';
import { successNotification } from '../../Services/NotificationService';
import {  useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PostJob() {
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();
    const select = fields;
    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: {
            jobTitle: '',
            company: '',
            experience: '',
            jobType: '',
            location: '',
            packageOffered: '',
            skillsRequired: [],
            about: '',
            descriptioin: content
        },
        validate: {
            jobTitle: isNotEmpty("Job Title is required"),
            company: isNotEmpty("Company is required"),
            experience: isNotEmpty("Experience is required"),
            jobType: isNotEmpty("Job Type is required   "),
            location: isNotEmpty("Location is required"),
            packageOffered: isNotEmpty("Package Offered is required"),
            skillsRequired: isNotEmpty("Skills Required is required"),
            about: isNotEmpty("About is required"),
            descriptioin: isNotEmpty("Description is required"),
        }

    });
    const handlePost=()=>{
        form.validate();
        if(!form.isValid()) return;
        console.log(form.getValues());
        postJob({...form.getValues() , postedBy:user.id,jobStatus:"ACTIVE"}).then(res=>{
            console.log("Job Posted Successfully",res);
            successNotification("Success" , "Job Posted Successfully");
            console.log("Posted job id : " , res.id);
            navigate(`/posted-job/${res.id}`);
        }).catch(err=>{
            console.log("Error in posting job" , err);
            successNotification("Error" , err.response.data.message );
        })
    }
    const handleDraft=()=>{
      
        postJob({...form.getValues() , postedBy:user.id,jobStatus:"DRAFT"}).then(res=>{
            console.log("Job Drafted Successfully",res);
            successNotification("Success" , "Job Drafted Successfully");
            console.log("Posted job id : " , res.id);
            navigate(`/posted-job/${res.id}`);
        }).catch(err=>{
            console.log("Error in posting job" , err);
            successNotification("Error" , err.response.data.message );
        })
    }
    return (
        <div className='w-4/5  mx-auto  '>
            <div className='text-2xl font-semibold mb-5 '> Post a Job</div>
            <div className='flex flex-col gap-5 '>
                <div className='flex gap-10 [&>*]:w-1/2 '>
                    <SelectInput form={form} name="jobTitle"  {...select[0]} />
                    <SelectInput form={form} name="company" {...select[1]} />
                </div>
                <div className='flex gap-10 [&>*]:w-1/2 '>
                    <SelectInput form={form} name="experience" {...select[2]} />
                    <SelectInput form={form} name="jobType" {...select[3]} />
                </div>
                <div className='flex gap-10 [&>*]:w-1/2 '>
                    <SelectInput form={form} name="location" {...select[4]} />
                    <NumberInput {...form.getInputProps('packageOffered')} label="Salary" withAsterisk min={1} max={300}
                        placeholder='Enter Salary' clampBehavior='strict' />
                </div>
                <TagsInput {...form.getInputProps('skillsRequired')} withAsterisk label="Skills" placeholder='Enter skill'
                    splitChars={[',', ' ', '|']} clearable acceptValueOnBlur />
                <Textarea  {...form.getInputProps("about")} autosize minRows={3} withAsterisk
                    label="About" placeholder="Enter about job.." />

                <div className="[&_button[data-active='true']]:!text-bright-sun-400
                 [&_button[data-active='true']]:!bg-bright-sun-400/20 " >
                    <div className='text-sm font-medium '>Job Description <span className='text-red-500' >*</span> </div>
                    <TextEditor form={form} name="descriptioin" />
                </div>
                <div className='flex gap-4 '>
                    <Button onClick={handlePost} color="brightSun.4" variant="light" >Publish Job</Button>
                    <Button onClick={handleDraft} color="brightSun.4" variant="outline" >Save as Draft</Button>
                </div>
            </div>
        </div>
    )
}

export default PostJob