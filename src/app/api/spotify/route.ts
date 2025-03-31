import { NextResponse } from 'next/server';
import queryString from 'query-string';

const BASE_URL = 'https://api.spotify.com/v1/me/player'

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const SPOTIFY_REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN

async function getAccessToken(): Promise<string> {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: queryString.stringify({
      grant_type: 'refresh_token',
      refresh_token: SPOTIFY_REFRESH_TOKEN
    })
  })

  const data = await response.json()
  return data.access_token
}

export async function GET() {
  const accessToken = await getAccessToken()
  
  // Get currently playing
  const nowPlayingResponse = await fetch(
    `${BASE_URL}/currently-playing`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  )

  // If not playing anything, get recently played
  if (nowPlayingResponse.status === 204) {
    const recentResponse = await fetch(
      `${BASE_URL}/recently-played?limit=1`,
      { headers: { Authorization: `Bearer ${accessToken}` } }
    )
    
    const { items } = await recentResponse.json()
    const track = items[0].track
    
    return NextResponse.json({
      isPlaying: false,
      songUrl: track.external_urls.spotify,
      title: track.name,
      albumImageUrl: track.album.images[0].url,
      artist: track.artists.map((artist: { name: string }) => artist.name).join(', ')
    }, { status: 200 })
  }

  // Return data
  const { item: track } = await nowPlayingResponse.json()
  
  return NextResponse.json({
    isPlaying: true,
    songUrl: track.external_urls.spotify,
    title: track.name,
    albumImageUrl: track.album.images[0].url,
    artist: track.artists.map((artist: { name: string }) => artist.name).join(', ')
  }, { status: 200 })
}
