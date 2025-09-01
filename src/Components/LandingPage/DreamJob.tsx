import { Avatar, TextInput } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

function DreamJob() {
    return (
        // Container
        <div className='flex sm-mx:flex-col-reverse items-center px-16 bs-mx:px-10 md-mx:px-5 '>
            {/* Left part */}
            <div className='flex flex-col w-[45%] sm-mx:w-full gap-3 '>
                <div className='text-6xl font-bold leading-tight text-mine-shaft-100 [&>span]:text-bright-sun-400 
                md-mx:text-4xl sm-mx:text-3xl '  >Find your <span >dream</span> <span>job</span> with us</div>
                <div className='text-lg text-mine-shaft-200 md-mx:text-base sm-mx:text-sm  '>Good life vegins with a good company . Start explore thousands of jobs in one place.</div>
                <div className='flex  gap-3 mt-5 items-center ' >
                    <TextInput className='bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100 ' variant='unstyled' label="Job Title" placeholder="Software Engineer" />
                    <TextInput className='bg-mine-shaft-900 rounded-lg p-1 px-2 text-mine-shaft-100 [&_input]:!text-mine-shaft-100 ' variant='unstyled' label="Job Type" placeholder="Fulltime" />
                    <div className='flex items-center justify-center h-full w-20 bg-bright-sun-400 text-mine-shaft-100 rounded-lg p-2 hover:bg-bright-sun-500 cursor-pointer '>
                        <IconSearch className='h-[85%] w-[85%] ' />
                    </div>
                </div>
            </div>

            {/* Right part */}
            <div className='w-[55%] sm-mx:w-full flex  items-center justify-center'>
                <div className='w-[30rem] relative '>
                    <img src="/Boy.png" alt="boy img" />
                    <div className='absolute  top-[50%] xs-mx:top-[10%] xs-mx:-left-8 -right-10 bs-mx:right-0  w-fit border-bright-sun-400 border rounded-lg p-2 backdrop-blur-md '>
                        <div className='text-center mb-1 text-sm text-mine-shaft-100 '>10K+ got job</div>
                        <Avatar.Group>
                            <Avatar src="avatar.png" />
                            <Avatar src="avatar1.png" />
                            <Avatar src="avatar2.png" />
                            <Avatar>+9</Avatar>
                        </Avatar.Group>
                    </div>

                    <div className='absolute top-[28%] xs:-left-5  xs-mx:!top-[60%] bs-mx:top-[35%] -left-5 w-fit border-bright-sun-400 border 
                     xs-mx:!right-0 rounded-lg p-2 backdrop-blur-md gap-3 flex flex-col ' >
                        <div className='flex gap-2 items-center  '>
                            <div className='w-10 h-10 p-1 bg-mine-shaft-900 rounded-lg '>
                                <img src="/Google.png" alt="google" />
                            </div>
                            <div className='text-sm text-mine-shaft-100  '>
                                <div >Software Engineer</div>
                                <div className='text-mine-shaft-200 text-xs '>New York</div>
                            </div>
                        </div>
                        <div className='flex gap-2 justify-around text-mine-shaft-200 text-xs  '>
                            <span>1 day ago</span>
                            <span>120 Applications</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DreamJob