import { Avatar, Rating } from '@mantine/core'
import { testimonials } from '../../Data/Data'

function TestiMonials() {
    return (
        <div className='mt-20 pb-5 ml-0 '>
            <div className=' text-4xl md-mx:text-3xl sm-mx:text-2xl xs-mx:text-xl text-center font-semibold mb-3 text-mine-shaft-100  '>What
                <span className='text-bright-sun-400'> User </span>  says about us?</div>

            <div className='flex justify-evenly md-mx:flex-wrap gap-5 px-3 mt-10 '>
                {
                    testimonials.map((data, index) => <div key={index} className='flex flex-col gap-3 w-[23%] md-mx:w-[48%]
                    xs-mx:w-full p-3 border-bright-sun-400 border rounded-xl  '>
                        <div className='flex gap-2 items-center -mt-2 '>
                            <Avatar className='!h-14 !w-14 ' src="avatar.png" alt="it's me" />
                            <div>
                                <div className='text-lg text-mine-shaft-100 font-semibold pt-5 sm-mx:text-base  '> {data.name} </div>
                                <Rating value={data.rating} fractions={2} readOnly />
                            </div>
                        </div>
                        <div className='text-xs text-mine-shaft-300 '>{data.testimonial}</div>
                    </div>)
                }
            </div>



        </div>
    )
}

export default TestiMonials