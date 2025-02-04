import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
    }

    const endpoint = `https://maps.googleapis.com/maps/api/place/autocomplete/json`;
    const params = new URLSearchParams({
        input: query,
        types: '(cities)',
        key: GOOGLE_API_KEY as string,
    });

    try {
        const response = await fetch(`${endpoint}?${params.toString()}`);

        if (!response.ok) {
            throw new Error('Failed to fetch suggestions');
        }

        const data = await response.json();

        if (data.status !== 'OK') {
            throw new Error(data.error_message || 'Failed to fetch suggestions');
        }

        const suggestions = data.predictions.map((prediction: any) => prediction.description);
        return NextResponse.json({ suggestions });
    } catch (error: any) {
        console.error('Error fetching suggestions:', error.message);
        return NextResponse.json({ error: error.message || 'An unknown error occurred' }, { status: 500 });
    }
}

