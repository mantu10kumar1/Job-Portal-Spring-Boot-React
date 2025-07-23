import { Anchor, Button, Checkbox, Group, PasswordInput, Radio, rem, TextInput } from '@mantine/core'
import { IconAt, IconLock } from '@tabler/icons-react'
import { useState } from 'react';
import { Link } from 'react-router-dom'

function SignUp() {
  const [value, setValue] = useState('react');
  return (
    <div className='w-1/2  px-20 flex flex-col justify-center gap-3 '>
      <div className='text-2xl font-semibold '>Create Account</div>
      <TextInput withAsterisk label="Full Name" placeholder='Your name' />
      <TextInput withAsterisk leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        label="Email" placeholder="Your email" />

      <PasswordInput withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Password" placeholder="Password" />
      <PasswordInput withAsterisk leftSection={<IconLock size={18} stroke={1.5} />} label="Confirm Password" placeholder="Confirm password" />

      <Radio.Group
        value={value}
        onChange={setValue}
        name="favoriteFramework"
        label="Select your favorite framework/library"
        description="This is anonymous"
        withAsterisk
      >
        <Group mt="xs">
          <Radio value="react" label="React" />
          <Radio value="svelte" label="Svelte" />
          <Radio value="ng" label="Angular" />
          <Radio value="vue" label="Vue" />
        </Group>
      </Radio.Group>

      <Checkbox autoContrast label={<>I accept{' '} <Anchor>terms & conditions</Anchor> </>} />
      <Button autoContrast variant='filled' >Sign up</Button>
      <div className='mx-auto'>Have an account? <Link to="/login" className='text-bright-sun-400 hover:underline '>Login </Link> </div>
    </div>
  )
}

export default SignUp
