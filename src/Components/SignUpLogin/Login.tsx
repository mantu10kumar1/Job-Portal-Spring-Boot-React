import { Button, LoadingOverlay, PasswordInput, rem, TextInput } from '@mantine/core'
import { IconAt,  IconLock } from '@tabler/icons-react'
import { useState } from 'react';
import {  useNavigate } from 'react-router-dom'
import { loginValidation } from '../../Services/FormValidation';
import { useDisclosure } from '@mantine/hooks';
import ResetPassword from './ResetPassword';
import { useDispatch } from 'react-redux';
import { errorNotification, successNotification } from '../../Services/NotificationService';
import { setUser } from '../../Slices/UserSlice';
import { loginUser } from '../../Services/AuthService';
import { setjwt } from '../../Slices/JWTSlice';
import { jwtDecode } from 'jwt-decode';

const form = {
  email: '',
  password: ''
}

function Login() {
  const [loading , setLoading] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState<{ [key: string]: string }>(form);
  const [formError, setFormError] = useState<{ [key: string]: string }>(form);
  const [opened, { open, close }] = useDisclosure(false);

  const navigate = useNavigate();
  const handleChange = (event: any) => {
    setFormError({...formError , [event.target.name]:""});
    console.log("Event Target : ", event.target.value);
    setData({ ...data, [event.target.name]: event.target.value })
  }
  const handleSubmit = () => {
    let valid = true, newFormError: { [key: string]: string } = {};
    for (let key in data) {
      newFormError[key] = loginValidation(key, data[key]);
      if (newFormError[key]) valid = false;
    }
    setFormError(newFormError);
    console.log("Data in Login : ", data);
    if (valid) {
    setLoading(true);
      loginUser(data)
        .then((res) => {
          console.log(res);
         successNotification("Login Successful" , "Redirecting to home page...");
           dispatch(setjwt(res.jwt));
            const decoded = jwtDecode(res.jwt);
            console.log("Jwt decoded data in login page : " , decoded);
            dispatch(setUser({...decoded, email: decoded.sub}));

            setTimeout(() => {
            setLoading(false);
           
            navigate('/');
          }, 4000);
        })
        .catch((err) => {
          setLoading(false);
          console.log("Error occure while register : ", err?.response?.data)
          errorNotification("Login Failed" , err.response.data.errorMessage);
        });
    }
  }

  return (
    <>   <LoadingOverlay className='size-lg' visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 , color:"brightSun.4"}} />

    <div className='w-1/2 sm-mx:w-full  px-20 bs-mx:px-10 md-mx:px-5 flex flex-col justify-center  gap-3 '>
      <div className='text-2xl font-semibold '>Create Account</div>
      <TextInput value={data.email} error={formError.email} onChange={handleChange} name='email' withAsterisk 
      leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        label="Email" placeholder="Your email" />

      <PasswordInput value={data.password} error={formError.password} onChange={handleChange} name='password' withAsterisk 
      leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />

      <Button onClick={handleSubmit} loading={loading} autoContrast variant='filled' >Login</Button>
      <div className='mx-auto sm-mx:text-sm xs-mx:text-xs'>Don't have an account? <span onClick={() =>{navigate("/signup");setFormError(form); 
      setData(form)}}
       className='text-bright-sun-400 hover:underline cursor-pointer sm-mx:text-sm xs-mx:text-xs '>SignUp </span> </div>
 
       <div onClick={open} className=' text-bright-sun-400 hover:underline cursor-pointer text-center sm-mx:text-sm xs-mx:text-xs ' >Forget Password</div>
    </div>
    <ResetPassword opened={opened} close={close} />
    </>
  )
}

export default Login
