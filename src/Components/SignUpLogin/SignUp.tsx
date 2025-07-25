import { Anchor, Button, Checkbox, Group, PasswordInput, Radio, rem, TextInput } from '@mantine/core'
import { IconAt, IconCheck, IconLock, IconX } from '@tabler/icons-react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../Services/UserService';
import { signupValidation } from '../../Services/FormValidation';
import { notifications } from '@mantine/notifications';

const form = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  accountType: ''
}

function SignUp() {
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const navigate = useNavigate();
  // Handler for form input changes
  const handleChange = (event: any) => {
    console.log("Event Target : ", event);
    if (typeof (event) === "string") {
      setData({ ...data, accountType: event })
      return;
    }
    let name = event.target.name, value = event.target.value
    setData({ ...data, [name]: value })
    setFormError({ ...formError, [name]: signupValidation(name, value) });

    if (name === 'password' && data.confirmPassword !== '') {
      let err = "";
      if (data.confirmPassword !== value) err = "Password and Confirm Password must be same";
      setFormError({ ...formError, [name]: signupValidation(name, value), confirmPassword: err });

    }

    if (name === 'confirmPassword') {
      if (data.password !== value) setFormError({ ...formError, [name]: "Password and Confirm Password must be same" });
      else setFormError({ ...formError, confirmPassword: "" });
    }

  }
  const handleSubmit = () => {
    let valid = true, newFormError: { [key: string]: string } = {};
    for (let key in data) {
      if (key === 'accountType') continue;
      if (key !== 'confirmPassword') newFormError[key] = signupValidation(key, data[key]);
      else if (data[key] !== data["password"]) newFormError[key] = "Password and Confirm Password must be same";
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    console.log("Valid : ", valid);

    if (valid === true) {

      console.log("Data in SignUp happend successfull : ", data);
      registerUser(data).then((res) => {
        console.log("This is the response data of the after registration : " , res);
        setData(form);
        notifications.show({
          title: 'Registration Successful',
          message: 'Redirecting to login page...🌟',
          withCloseButton: true,
          icon: <IconCheck style={{ width: "90%", height: "90%" }} />,
          color: 'teal',
          withBorder: true,
          className: "!border-green-500"
        })
        setTimeout(() => {
          navigate('/login');
        }, 4000);
      })
        .catch((err) =>{ 
          console.log("Error occure while register : ", err?.response?.data)
          notifications.show({
            title: 'Registration Failed',
            message: err.response.data.errorMessage,
            withCloseButton: true,
            icon: <IconX style={{ width: "90%", height: "90%" }} />,
            color: 'red',
            autoClose: 5000,
            withBorder: true,
            className: "!border-red-500"
          })
        });
    }

  }

  return (
    <div className='w-1/2  px-20 flex flex-col justify-center gap-3 '>
      <div className='text-2xl font-semibold '>Create Account</div>
      <TextInput value={data.name} error={formError.name} onChange={handleChange} name='name' withAsterisk label="Full Name" placeholder='Your name' />
      <TextInput value={data.email} error={formError.email} onChange={handleChange} name='email' withAsterisk leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        label="Email" placeholder="Your email" />

      <PasswordInput value={data.password} error={formError.password} onChange={handleChange} name='password' withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
      <PasswordInput value={data.confirmPassword} error={formError.confirmPassword} onChange={handleChange} name='confirmPassword' withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Confirm Password" placeholder="Confirm password" />

      <Radio.Group
        value={data.accountType}
        onChange={handleChange}
        label="You are?"
        description="This is anonymous"
        withAsterisk
      >
        <Group mt="xs">
          <Radio className='py-4 px-6 border hover:bg-mine-saft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border
          -bright-sun-400 border-mine-shaft-800 rounded-lg '  autoContrast value="APPLICANT" label="Applicant" />
          <Radio className='py-4 px-6 border hover:bg-mine-saft-900 has-[:checked]:bg-bright-sun-400/5 has-[:checked]:border
          -bright-sun-400 border-mine-shaft-800 rounded-lg ' autoContrast value="EMPLOYER" label="Employer" />
        </Group>
      </Radio.Group>

      <Checkbox autoContrast label={<>I accept{' '} <Anchor>terms & conditions</Anchor> </>} />
      <Button onClick={handleSubmit} autoContrast variant='filled' >Sign up</Button>
      <div className='mx-auto'>Have an account? <span onClick={() =>{navigate("/login");setFormError(form); setData(form)}}
       className='text-bright-sun-400 hover:underline cursor-pointer '>Login </span> </div>
    </div>
  )
}

export default SignUp
