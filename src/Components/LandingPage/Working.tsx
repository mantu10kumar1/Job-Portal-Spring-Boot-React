import { Avatar } from '@mantine/core'
import { work } from '../../Data/Data'

function Working() {
    return (
        <div className='mt-20 pb-5  '>
            <div className=' text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl text-center font-semibold mt-10 text-mine-shaft-100  '>
                How it <span className='text-bright-sun-400'>Works</span> </div>
            <div className='text-lg sm-mx:text-lg xs-mx:text-base sm-mx:w-11/12 mx-auto mb-10 text-mine-shaft-100 text-center w-1/2 '>
                Effortlessly navigate through the process and land your dream job.
            </div>

            <div className=' flex  px-16 bs-mx:px-10 gap-2 md-mx:px-5 md-mx:flex-col  justify-between items-center  '>
                {/* left div */}
                <div className='relative  '>
                    <img className='w-[30rem] ' src="/Working/Girl.png" alt="girl" />
                    <div className='w-36 xs-mx:w-28 flex flex-col top-[15%] right-0 absolute items-center gap-1 border border-bright-sun-400
                     rounded-xl py-3 px-1 backdrop-blur-md '>
                        <Avatar className='!h-16 !w-16 xs-mx:!w-12 xs-mx:!h-9  ' src="avatar1.png" alt="it's me" />
                        <div className="text-sm sm-mx:text-xs font-semibold text-mine-shaft-200 text-center  ">Complete your profile</div>
                        <div className="text-sm font-semibold text-mine-shaft-300 text-center ">70% Completed</div>
                    </div>
                </div>
                {/* right div */}
                <div className='flex flex-col gap-10  '>
                    {
                        work.map((item, index) =>
                            <div key={index} className='flex items-center gap-4 '>
                                <div className='p-2.5 bg-bright-sun-300 rounded-rull '>
                                    <img className=' h-12 w-12  md-mx:w-9 md-mx:h-9 sm-mx:w-7 sm-mx:h-7 ' src={`/Working/${item.name}.png`} alt={item.name} />
                                </div>
                                <div >
                                    <div className='text-mine-shaft-200 text-xl font-semibold md-mx:text-lg sm-mx:text-base  ' >{item.name}</div>
                                    <div className='text-mine-shaft-300 dm-mx:text-sm sm-mx:text-xs '>{item.desc}</div>
                                </div>

                            </div>
                        )
                    }
                </div>
            </div>


        </div>
    )
}

export default Working