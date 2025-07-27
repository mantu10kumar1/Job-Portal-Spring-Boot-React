import { Button, Modal, PinInput, TextInput } from '@mantine/core'
import { IconAt } from '@tabler/icons-react';
import React, { useState } from 'react'
import { sendOtp, verifyOtp } from '../../Services/UserService';

function ResetPassword(props: any) {
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);

    const handleSendOtp = () => {
        setOtpSending(true);
        sendOtp(email).then((res) => {
            console.log("OTP sent successfully", res);
            setOtpSent(true);
            setOtpSending(false);
        }).catch((err) => {
            console.log("Error while sending otp : ", err);
            setOtpSending(false);
        })
    }

    const handleVerifyOTP = (otp: string) => {
        verifyOtp(email , otp).then((res) =>{
            console.log("OTP verified successfully" , res);
        }).catch((err) => {
            console.log("Error while verifying otp : ", err);
        })
    }

    const resendOtp = () => {
        // setOtpSent(false);
        // setEmail("");
    }
    const changeEmail = () =>{
        setOtpSent(false);
        // setEmail("");
        // props.close();
    }

    return (
        <Modal opened={props.opened} onClose={props.close} title="Reset Password">
            <div className='flex flex-col gap-6'>
                <TextInput value={email} size="md" onChange={(e) => setEmail(e.target.value)} name='email' withAsterisk
                    leftSection={<IconAt size={16} />} label="Email" placeholder="Your email"
                    rightSection={<Button loading={otpSending} size="xs" className='mr-1' onClick={handleSendOtp} autoContrast variant='filled'
                        disabled={email === "" || otpSent} >
                        Send</Button>} rightSectionWidth="xl" />

                {otpSent && <PinInput onComplete={handleVerifyOTP} length={6} className='mx-auto' size='md' gap="lg" type="number" />}
                {otpSent && <div>
                    <Button fullWidth loading={otpSending}  onClick={resendOtp} color='brightSun.4' autoContrast variant='light' > Resend</Button>

                   <Button fullWidth onClick={changeEmail} autoContrast variant='light' > Change Email</Button>
                </div>}
            </div>
        </Modal>
    )
}

export default ResetPassword
