'use client';
import { useState, useEffect } from 'react';
import AboutBox from './AboutBox';
import Image from 'next/image';

export default function Spotify() {
    const [isLoading, setIsLoading] = useState(true);
    const [track, setTrack] = useState<SpotifyTrack>({
        songUrl: '',
        title: '',
        albumImageUrl: '',
        artist: '',
        isPlaying: false
    });

    useEffect(() => {
        const fetchSpotifyData = async () => {
            setIsLoading(true);

            try {
                const response = await fetch('/api/spotify');
                const data = await response.json();
                const { songUrl, title, albumImageUrl, artist, isPlaying } = data;
                setTrack({
                    songUrl,
                    title,
                    albumImageUrl,
                    artist,
                    isPlaying
                });
            } catch (error) {
                console.error('Error fetching Spotify data:', error);
                setTrack({
                    songUrl: '',
                    title: 'Error fetching data',
                    albumImageUrl: '',
                    artist: '',
                    isPlaying: false
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchSpotifyData();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className='flex gap-5 text-sm max-md:text-xs items-center px-1.5'>
                    <iframe src="https://giphy.com/embed/17mNCcKU1mJlrbXodo" className="lg:w-14 lg:h-14 w-12 h-12 rounded-lg" />
                    <div className="flex flex-col gap-1 text-left">
                        <p className="font-semibold line-clamp-2">Loading...</p>
                    </div>
                </div>
            );
        }

        return (
            <div className='flex gap-5 text-sm max-md:text-xs items-center px-1.5'>
                <a className="flex-shrink-0" href={track.songUrl} target="_blank" rel="noopener noreferrer">
                    <img
                        src={track.albumImageUrl}
                        alt="Cover"
                        className="lg:w-14 lg:h-14 w-12 h-12 rounded-lg opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                </a>
                <div className="flex flex-col gap-1 text-left w-full overflow-hidden">
                    <p className="font-semibold line-clamp-2 break-all overflow-hidden text-ellipsis">{track.title}</p>
                    <p className="text-zinc-500 line-clamp-1 break-all overflow-hidden text-ellipsis">{track.artist}</p>
                </div>
            </div>
        );
    };

    return (
        <AboutBox
            icon={
                <Image
                    src={'/svgs/logo/Spotify.svg'}
                    width={19}
                    height={19}
                    alt="Spotify logo"
                    draggable="false"
                />
            }
            title={track.isPlaying ? 'Now Playing' : 'Recently Played'}
        >
            {renderContent()}
        </AboutBox>
    );
}