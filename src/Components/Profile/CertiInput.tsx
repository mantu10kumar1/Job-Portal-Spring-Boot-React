import { Button, TextInput } from '@mantine/core'
import { MonthPickerInput } from '@mantine/dates';
import { isNotEmpty, useForm } from '@mantine/form';
import { useDispatch, useSelector } from 'react-redux';
import { changeProfile } from '../../Slices/ProfileSlice1';
import { successNotification } from '../../Services/NotificationService';
import SelectInput from './SelectInput';
import fields from '../../Data/Profile';

function CertiInput(props: any) {
    console.log("props value in certiInput ", props);

    const dispatch = useDispatch();
    const select = fields;
    const profile = useSelector((state: any) => state.profile);
    const form = useForm({
        mode: 'controlled',
        validateInputOnChange: true,
        initialValues: props.add ? {
            name: '',
            issuer: '',
            issueDate: new Date(),
            certificateId: '',
        } : {
            name: props.name || '',
            issuer: props.issuer || '',
            issueDate: props.issueDate ? new Date(props.issueDate) : new Date(),
            certificateId: props.certificateId || ''
        },
        validate: {
            name: isNotEmpty("Name is required"),
            issuer: isNotEmpty("Issuer is required"),
            issueDate: isNotEmpty("Issue Date is required"),
            certificateId: isNotEmpty("Certificate ID is required"),
        }
    });

    const handleSave = () => {
        form.validate();
        if (!form.isValid()) return;

        // Ensure props.certification is an array before spreading it.
        // If props.certification is undefined or null, it will default to an empty array.
        let certi = Array.isArray(props.certification) ? [...props.certification] : [];

        console.log("props certification in CertiInput ", certi);

        // Get the form values
        const newCertificateData = form.getValues();

        // Prepare certificate data for Redux (convert issueDate to ISO string)
        const certificateToPush = {
            ...newCertificateData,
            issueDate: newCertificateData.issueDate instanceof Date
                ? newCertificateData.issueDate.toISOString()
                : new Date(newCertificateData.issueDate).toISOString()
        };

        certi.push(certificateToPush); // Push the prepared object

        let updatedProfile = { ...profile, certification: certi };
        props.setEdit(false);
        dispatch(changeProfile(updatedProfile));
        successNotification("Success", "Certificate added Successfully");
    }

    return (
        <div className='flex flex-col gap-3'>
            <div className=" text-lg font-semibold ">Add Certificate </div>
            <div className="flex gap-10 [&>*]:w-1/2 ">
                <TextInput {...form.getInputProps("name")} label="Title" withAsterisk placeholder="Enter Title" />
                <SelectInput form={form} name="issuer" {...select[1]} />
            </div>
            <div className="flex gap-10 [&>*]:w-1/2 ">
                <MonthPickerInput {...form.getInputProps("issueDate")} minDate={new Date()} label="Issue Date"
                    placeholder="Pick date" withAsterisk />
                <TextInput {...form.getInputProps("certificateId")} label="Certificate ID" withAsterisk placeholder="Enter ID" />

            </div>
            <div className='flex gap-5  '>
                <Button onClick={handleSave} color='green.8' variant='light' >Save</Button>
                <Button onClick={() => props.setEdit(false)} color='red.8' variant='light' >Cancle</Button>
            </div>

        </div>
    )
}

export default CertiInput
