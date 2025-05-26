import { Carousel } from "@mantine/carousel"
import { jobCategory } from "../Data/Data"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"


function JobCategory() {
  return (
    <div className='mt-20 pb-5  '>
      <div className=' text-4xl text-center font-semibold mt-10 text-mine-shaft-100  '>Brwose <span className='text-bright-sun-400'>Job</span>  Category</div>
      <div className='text-lg mx-auto mb-10 text-mine-shaft-100 text-center w-1/2 '>Explore diverse job opportunities tailored to your skills. Start your career journey today! </div>

      <Carousel
        className="focus-visible:[&_button]:!outline-none [&_button]:!bg-bright-sun-400
         [&_button]:!border-none [&_button]:hover:opacity-75 [&_button]:opacity-0 hover:[&_button]:opacity-100  " 
        // [&_button] means all the buttons inside the carousel 
        slideSize="22%"
        height={200}
        slideGap="md"
        controlsOffset="sm"
        controlSize={26}
        withControls withIndicators={false}

        nextControlIcon={<IconArrowRight className="h-8 w-8 " />}
        previousControlIcon={<IconArrowLeft className="h-8 w-8 " />}

        emblaOptions={{
          loop: true,
          dragFree: false,
          align: 'center',
          slidesToScroll: 3
        }}
      >
        {
          jobCategory.map((category, index) => <Carousel.Slide key={index}>
            <div className='flex flex-col items-center w-64 gap-1 border border-bright-sun-400 p-5 rounded-xl hover:cursor-pointer
             hover:shadow-[0_0_5px_black] transition duration-300 ease-in-out !shadow-bright-sun-300  '>
              <div className='p-2 bg-bright-sun-300 rounded-full '>
                <img className='w-8 h-8 ' src={`/Category/${category.name}.png`} alt={category.name} />
              </div>
              <div className='text-mine-shaft-100 text-xl font-semibold  '>{category.name}</div>
              <div className='text-sm text-center text-mine-shaft-300 '>{category.desc}</div>
              <div className='text-bright-sun-300 text-lg '>{category.jobs}+ new job posted</div>
            </div>
          </Carousel.Slide>)
        }
      </Carousel>


    </div>
  )
}

export default JobCategory