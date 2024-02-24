import React from 'react'

const ProfileForm = () => {
  return (
    <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
      <div className='flex'>
    <div>
        <img src="/assets/images.profile.jpg" alt="" height={100} width={100} className='rounded-full' />
    </div>
    <input type="file" placeholder='Change profile photo' />
      </div>
    </div>
  )
}

export default ProfileForm