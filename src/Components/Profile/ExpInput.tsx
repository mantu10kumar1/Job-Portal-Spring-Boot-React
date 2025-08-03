import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../../Data/Profile";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";
import { useDispatch, useSelector } from "react-redux";
import { isNotEmpty, useForm } from "@mantine/form";
import { successNotification } from "../../Services/NotificationService";
import { changeProfile } from "../../Slices/ProfileSlice1";

function ExpInput(props: any) {
  const dispatch = useDispatch();
  const select = fields;
  const profile = useSelector((state: any) => state.profile);

  const [checked, setChecked] = useState(props.working || false);

  useEffect(() => {
    if (!props.add && props.title) {
      form.setValues({
        title: props.title,
        company: props.company,
        location: props.location,
        description: props.description,
        // Convert string dates from props to Date objects
        startDate: props.startDate ? new Date(props.startDate) : new Date(),
        endDate: props.endDate ? new Date(props.endDate) : new Date(),
        working: props.working || false,
      });
    }
  }, [props.title, props.company, props.location, props.description, props.startDate, props.endDate, props.working])

  const form = useForm({
    mode: 'controlled',
    validateInputOnChange: true,
    initialValues: props.add ? {
      title: '',
      company: '',
      location: '',
      description: '',
      startDate: new Date(),
      endDate: new Date(),
      working: false,
    } : {
      title: props.title || '',
      company: props.company || '',
      location: props.location || '',
      description: props.description || '',
      // Ensure initial values are Date objects
      startDate: props.startDate ? new Date(props.startDate) : new Date(),
      endDate: props.endDate ? new Date(props.endDate) : new Date(),
      working: props.working || false,
    },
    validate: {
      title: isNotEmpty("Title is required"),
      company: isNotEmpty("Company is required"),
      location: isNotEmpty("Location is required"),
      description: isNotEmpty("Description is required"),
    },
  });

  const [desc, setDesc] = useState(form.values.description);

  // This function would handle form submission
  const handleSubmit = (values: typeof form.values) => {
    console.log("Form values:", values);
    // You would typically dispatch an action to save the data here
    // after saving, you hide the form
    props.setEdit(false);
  };

  const handleSave = () => {
  form.validate();
  if (!form.isValid()) return;
  
  let exp = [...profile.experience];
  const formValues = form.getValues();

  // Create new date objects, ensuring they're valid before calling toISOString()
  const startDate = formValues.startDate instanceof Date ? formValues.startDate : new Date(formValues.startDate);
  const endDate = formValues.endDate instanceof Date ? formValues.endDate : new Date(formValues.endDate);

  if (props.add) {
    exp.push({
      ...formValues,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
  } else {
    exp[props.index] = {
      ...formValues,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
  }

  let updatedProfile = { ...profile, experience: exp };
  props.setEdit(false);
  dispatch(changeProfile(updatedProfile));
  successNotification("Success", `Experience ${props.add ? "added" : "updated"} Successfully`);
}
  return (
    <div className="flex flex-col gap-3">
      <div className="text-lg font-semibold"> {props.add ? "Add" : "Edit"} Experience</div>
      <div className="flex gap-10 [&>*]:w-1/2">
        <SelectInput form={form} name="title" {...select[0]} />
        <SelectInput form={form} name="company" {...select[1]} />
      </div>
      <SelectInput form={form} name="location" {...select[2]} />
      <Textarea
        {...form.getInputProps("description")}
        autosize
        minRows={3}
        withAsterisk
        label="Summary"
        placeholder="Enter Summary..."
      />
      <div className="flex gap-10 [&>*]:w-1/2">
        <MonthPickerInput
          {...form.getInputProps("startDate")}
          label="Start Date"
          placeholder="Pick date"
          withAsterisk
          maxDate={form.getValues().endDate || undefined}
        />
        <MonthPickerInput
          {...form.getInputProps("endDate")}
          label="End Date"
          placeholder="Pick date"
          withAsterisk
          disabled={form.getValues().working}
          maxDate={new Date()}
          minDate={form.getValues().startDate || undefined}
        />
      </div>
      <Checkbox
        {...form.getInputProps("working")}
        autoContrast
        label="Currently working here"
        checked={form.getValues().working}
        onChange={(event) => { form.setFieldValue("working", event.currentTarget.checked); }}
      />
      <div className='flex gap-5'>
        <Button onClick={handleSave} color='green.8' variant='light'>
          Save
        </Button>
        <Button onClick={() => props.setEdit(false)} color='red.8' variant='light'>
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default ExpInput;