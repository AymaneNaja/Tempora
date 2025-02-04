import React from 'react'
import Searchbar from './Searchbar'
import { DayNightSwitch } from '@/app/DayNightSwitch'
import UserLocation from './UserLocation'


function Navbar() {
    return (
        <div className='my-4 w-full flex gap-2 items-center justify-start  '>
            <Searchbar />
            <DayNightSwitch />
            <UserLocation />
        </div>
    )
}

export default Navbar