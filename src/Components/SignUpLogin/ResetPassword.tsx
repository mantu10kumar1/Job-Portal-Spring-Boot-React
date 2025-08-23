import { Button, Modal, PasswordInput, PinInput, TextInput } from '@mantine/core'
import { IconAt, IconLock } from '@tabler/icons-react';
import React, { useState } from 'react'
import { changePassword, sendOtp, verifyOtp } from '../../Services/UserService';
import { errorNotification, successNotification } from '../../Services/NotificationService';
import { signupValidation } from '../../Services/FormValidation';
import { useInterval } from '@mantine/hooks';

function ResetPassword(props: any) {
    const [email, setEmail] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpSending, setOtpSending] = useState(false);
    const [verified, setVerified] = useState(false);
    const [password, setPassword] = useState("");
    const [passErr, setPassErr] = useState("");
    const [resendLoader, setResendLoader] = useState(false);
    const [seconds, setSeconds] = useState(60);

    const interval = useInterval(() => {
        if (seconds === 0) {
            setResendLoader(false);
            setSeconds(60);
            interval.stop();
        } else setSeconds((s) => s - 1)
    }
        , 1000);

    const handleSendOtp = () => {
        setOtpSending(true);
        sendOtp(email).then((res) => {
            console.log("OTP sent successfully", res);
            successNotification("OTP Sent Successfully", "Enter OTP to reset.");
            setOtpSent(true);
            setOtpSending(false);
            setResendLoader(true);
            interval.start();
        }).catch((err) => {
            console.log("Error while sending otp : ", err);
            errorNotification("Error Sending OTP", err.response.data.errorMessage);
        })
    }

    const handleVerifyOTP = (otp: string) => {
        verifyOtp(email, otp).then((res) => {
            console.log("OTP verified successfully", res);
            successNotification("OTP Verified", "Enter new password.");
            setVerified(true);
        }).catch((err) => {
            console.log("Error while verifying otp : ", err);
            errorNotification("OTP Verification Failed", err.response.data.errorMessage);
        })
    }

    const resendOtp = () => {
        if (resendLoader) return;
        handleSendOtp();
    }
    const changeEmail = () => {
        setOtpSent(false);
        setResendLoader(false);
        setSeconds(60);
        setVerified(false);
        interval.stop();
    }
    const handleResetPassword = () => {
        changePassword(email, password).then((res) => {
            console.log("Password changed successfully", res);
            successNotification("Password Changed Successfully...", "Login with new password.");
            props.close();
        }).catch((err) => {
            console.log("Error while changing password : ", err);
            errorNotification("Password Reset Failed", err.response.data.errorMessage);
            setPassErr(err.response.data.errorMessage);
        });
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
                {otpSent && !verified && <div className='flex gap-2'>
                    <Button fullWidth loading={otpSending && !otpSent} onClick={resendOtp} color='brightSun.4' autoContrast variant='light' >
                        {resendLoader ? seconds : "Resend"} </Button>

                    <Button fullWidth onClick={changeEmail} autoContrast variant='light' > Change Email</Button>
                </div>}
                {verified &&
                    <PasswordInput value={password} error={passErr} onChange={(e) => {
                        setPassword(e.target.value);
                        setPassErr(signupValidation("password", e.target.value))
                    }}

                        name='password' withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password"
                        placeholder="Password" />
                }
                {
                    verified && <Button onClick={handleResetPassword} autoContrast variant='filled' >Change Password</Button>
                }
            </div>
        </Modal>
    )
}

export default ResetPassword
