import React from 'react'
import Profile from '../Profile/Profile'
import { profile } from '../Data/TalentData'

function ProfilePage() {
  return (
    <div className="min-h-[90vh] bg-mine-shaft-950 font-['poppins'] ">
      <Profile {...profile}/>
    </div>
  )
}

export default ProfilePage
