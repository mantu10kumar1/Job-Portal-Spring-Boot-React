import { Button, TextInput } from '@mantine/core'
import  { useState } from 'react'
import SelectInput from './SelectInput';
import { MonthPickerInput } from '@mantine/dates';
import { fields } from '../../Data/PostJob';

function CertiInput(props: any) {
    const select = fields;
    const [issueDate, setIssueDate] = useState<Date | null>(new Date());

    return (
        <div className='flex flex-col gap-3'>
            <div className=" text-lg font-semibold ">Add Certificate </div>
            <div className="flex gap-10 [&>*]:w-1/2 ">
                <TextInput label="Title" withAsterisk placeholder="Enter Title" />
                <SelectInput {...select[1]} />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2 ">
                <MonthPickerInput minDate={new Date()} label="Issue Date" placeholder="Pick date" withAsterisk value={issueDate}
                 onChange={(value: string) => setIssueDate(value ? new Date(value) : null)} />
                <TextInput label="Certificate ID" withAsterisk placeholder="Enter ID" />

            </div>
            <div className='flex gap-5  '>
                <Button onClick={() => props.setEdit(false)} color='brightSun.4' variant='outline' >Save</Button>
                <Button onClick={() => props.setEdit(false)} color='red.8' variant='light' >Cancle</Button>
            </div>

        </div>
    )
}

export default CertiInput
