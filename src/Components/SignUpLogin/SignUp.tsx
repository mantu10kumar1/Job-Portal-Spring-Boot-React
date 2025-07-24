import { Anchor, Button, Checkbox, Group, PasswordInput, Radio, rem, TextInput } from '@mantine/core'
import { IconAt, IconLock } from '@tabler/icons-react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { registerUser } from '../../Services/UserService';
import { signupValidation } from '../../Services/FormValidation';

const form = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  accountType: ''
}

function SignUp() {
  const [data, setData] = useState(form);
  const [formError, setFormError] = useState(form);
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
    console.log("Data in SignUp : ", data);
    registerUser(data).then((res) => {
      console.log(res);
    }).then((res) => {
      console.log(res);
    })
      .catch((err) => console.log("Error occure while register : ", err?.response?.data));

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
      <div className='mx-auto'>Have an account? <Link to="/login" className='text-bright-sun-400 hover:underline '>Login </Link> </div>
    </div>
  )
}

export default SignUp
