import Companies from "../LandingPage/Companies";
import DreamJob from "../LandingPage/DreamJob";
import JobCategory from "../LandingPage/JobCategory";
import Subscribe from "../LandingPage/Subscribe";
import TestiMonials from "../LandingPage/TestiMonials";
import Working from "../LandingPage/Working";

const HomePage = () =>{
    return(
        <div className="min-h-[100vh] bg-mine-shaft-950 font-['poppins'] ">
            <DreamJob/>
            <Companies/>
            <JobCategory/>
            <Working/>
            <TestiMonials/>
            <Subscribe/>
        </div>
    )
}

export default HomePage;