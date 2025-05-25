import { Carousel } from "@mantine/carousel"


function JobCategory() {
  return (
    <div className='mt-20 pb-5  '>
      <div className=' text-4xl text-center font-semibold mt-10 text-mine-shaft-100  '>Brwose <span className='text-bright-sun-400'>Job</span>  Category</div>
      <div className='text-lg mx-auto text-mine-shaft-100 text-center w-1/2 '>Explore diverse job opportunities tailored to your skills. Start your career journey today! </div>

      <Carousel
        slideSize="70%"
        height={200}
        slideGap="md"
        controlsOffset="sm"
        controlSize={26}
        withControls
        withIndicators={false}
      >
        {/* ...slides */}
      </Carousel>

      <div className='flex flex-col items-center w-64 '>
        <div className='p-2 bg-bright-sun-300 rounded-full '>
          <img className='w-8 h-8 ' src="/Category/Digital Marketing.png" alt="" />
        </div>
        <div className='text-mine-shaft-100 text-xl font-semibold  '>Digital Marketing</div>
        <div className='text-sm text-center text-mine-shaft-300 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis, possimus?</div>
        <div className='text-bright-sun-300 text-lg '>1K+ new job posted</div>
      </div>
    </div>
  )
}

export default JobCategory