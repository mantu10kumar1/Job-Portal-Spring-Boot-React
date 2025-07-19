import React, { useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../Data/Profile";
import { Button, Checkbox, Textarea } from "@mantine/core";
import { MonthPickerInput } from "@mantine/dates";

function ExpInput(props: any) {
  const select = fields;
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endtDate, setEndDate] = useState<Date | null>(new Date());
  const [checked, setChecked] = useState(false);

  const [desc, setDesc] = useState(
    "As a Software Engineer at Google, I am responsible for designing, developing, and maintaining scalable software solutions that enhance user experience and improve operational efficiency. My role involves collaborating with cross-functional teams to define project requirements, develop technical specifications, and implement robust applications using cutting-edge technologies. I actively participate in code reviews, ensuring adherence to best practices and coding standards, and contribute to the continuous improvement of the development process."
  );

  return (
    <div className="flex flex-col gap-3">
      <div className=" text-lg font-semibold "> {props.add ? "Add":"Edit"} Experience</div>
      <div className="flex gap-10 [&>*]:w-1/2 ">
        <SelectInput {...select[0]} />
        <SelectInput {...select[1]} />
      </div>
      <SelectInput {...select[2]} />
      <Textarea
        autosize
        minRows={3}
        withAsterisk
        label="Summary"
        placeholder="Enter Summary..."
        value={desc}
        onChange={(event) => setDesc(event.currentTarget.value)}
      />
      <div className="flex gap-10 [&>*]:w-1/2 ">
        <MonthPickerInput
          label="Start Date"
          placeholder="Pick date"
          withAsterisk
          value={startDate}
          maxDate={endtDate || undefined}
          onChange={(value) => setStartDate(value as unknown as Date | null)}
        />
        <MonthPickerInput label="End Date" placeholder="Pick date" withAsterisk  disabled={checked} value={endtDate} maxDate={new Date()}
         minDate={startDate || undefined} onChange={(value) => setEndDate(value as unknown as Date | null)}  />

      </div>
      <Checkbox onChange={(event) => setChecked(event.currentTarget.checked)} autoContrast label="Currently working here" />
      <div className='flex gap-5  '>
        <Button onClick={() => props.setEdit(false)} color='brightSun.4' variant='outline' >Save</Button>
        <Button onClick={() => props.setEdit(false)} color='red.8' variant='light' >Cancle</Button>
      </div>
    </div>
  );
}

export default ExpInput;
