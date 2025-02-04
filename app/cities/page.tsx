import CityWidget from '@/components/cities/CityWeatherDashboard'
import React from 'react'

type Props = {}

function page({ }: Props) {
    return (
        <div>
            <CityWidget />
        </div>

    )
}

export default page