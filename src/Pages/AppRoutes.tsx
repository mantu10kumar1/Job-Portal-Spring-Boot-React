import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Header from "../Components/Header/Header"
import { Divider } from "@mantine/core"
import FindTalentPage from "./FindTalentPage"
import FindJobsPage from "./FindJobsPage"
import CompanyPage from "./CompanyPage"
import PostedJobPage from "./PostedJobPage"
import JobHistoryPage from "./JobHistoryPage"
import JobPage from "./JobPage"
import ApplyJobPage from "./ApplyJobPage"
import PostJobPage from "./PostJobPage"
import TalentProfilePage from "./TalentProfilePage"
import SignUpPage from "./SignUpPage"
import ProfilePage from "./ProfilePage"
import HomePage from "./HomePage"
import Footer from "../Components/Footer/Footer"
import { useSelector } from "react-redux"

const AppRoutes = () => {
    const user = useSelector((state:any) => state.user);
    
    return <BrowserRouter>
        <div className='relative'>
            <Header />
            <Divider mx='xs' size="sm" />
            <Routes>
                <Route path='/find-jobs' element={<FindJobsPage />} />
                <Route path='/find-talent' element={<FindTalentPage />} />
                <Route path='/company/:name' element={<CompanyPage />} />
                <Route path='/posted-job/:id' element={<PostedJobPage />} />
                <Route path='/job-history' element={<JobHistoryPage />} />
                <Route path='/jobs/:id' element={<JobPage />} />
                <Route path='/apply-job/:id' element={<ApplyJobPage />} />
                <Route path='/post-job' element={<PostJobPage />} />
                <Route path='/talent-profile' element={<TalentProfilePage />} />
                <Route path='/signup' element={user ? <Navigate to="/" /> : <SignUpPage />} />
                <Route path='/login' element={user ? <Navigate to="/" /> : <SignUpPage />} />
                <Route path='/profile' element={<ProfilePage />} />
                <Route path='*' element={<HomePage />} />
            </Routes>
            <Footer />
        </div>
    </BrowserRouter>

}

export default AppRoutes;