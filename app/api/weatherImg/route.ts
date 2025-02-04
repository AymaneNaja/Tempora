import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')

    if (!city) {
        return NextResponse.json({ error: 'City parameter is required' }, { status: 400 })
    }

    const PEXELS_API_KEY = process.env.NEXT_PUBLIC_PEXELS_API_KEY
    if (!PEXELS_API_KEY) {
        console.error('PEXELS_API_KEY is not set')
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }

    try {
        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${encodeURIComponent(city)}&per_page=1`,
            {
                headers: {
                    Authorization: PEXELS_API_KEY,
                },
            }
        )

        if (!response.ok) {
            throw new Error('Failed to fetch image')
        }

        const data = await response.json()
        const imageUrl = data.photos[0]?.src?.large2x || null

        return NextResponse.json({ imageUrl })
    } catch (error) {
        console.error('Error fetching city image:', error)
        return NextResponse.json({ error: 'Failed to fetch city image' }, { status: 500 })
    }
}
