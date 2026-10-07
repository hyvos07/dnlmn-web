'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Track {
  songUrl: string;
  title: string;
  albumImageUrl: string;
  artist: string;
  isPlaying: boolean;
}

type State = { status: 'loading' } | { status: 'error' } | { status: 'ready'; track: Track };

function isTrack(data: unknown): data is Track {
  const t = data as Partial<Track> | null;
  return !!t && typeof t.title === 'string' && typeof t.artist === 'string' && typeof t.albumImageUrl === 'string';
}

/** Now playing / last played from /api/spotify. Fetches once the card is near the viewport. */
export default function SpotifyCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch('/api/spotify');
        const data: unknown = res.ok ? await res.json() : null;
        if (!cancelled) setState(isTrack(data) ? { status: 'ready', track: data } : { status: 'error' });
      } catch {
        if (!cancelled) setState({ status: 'error' });
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        load();
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
    };
  }, []);

  const playing = state.status === 'ready' && state.track.isPlaying;

  return (
    <div ref={ref} className="rounded-2xl border border-line bg-bg-elev p-4" aria-busy={state.status === 'loading'}>
      <div className="mb-3 flex items-center justify-between font-mono text-label uppercase text-fg-muted">
        <span className="flex items-center gap-2">
          <Image src="/svgs/logo/Spotify.svg" alt="" width={14} height={14} />
          {state.status === 'ready' ? (playing ? 'Now playing' : 'Last played') : 'Spotify'}
        </span>
        {playing && (
          <span aria-hidden="true" className="flex h-3 items-end gap-[2px]">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className="eq-bar w-[3px] origin-bottom rounded-sm bg-accent motion-reduce:animate-none"
                style={{ animationDelay: `${i * -0.22}s` }}
              />
            ))}
          </span>
        )}
      </div>

      {state.status === 'loading' && (
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 shrink-0 animate-pulse rounded-lg bg-line motion-reduce:animate-none" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/4 animate-pulse rounded bg-line motion-reduce:animate-none" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-line motion-reduce:animate-none" />
          </div>
          <span className="sr-only">Loading what I&apos;m listening to</span>
        </div>
      )}

      {state.status === 'error' && <p className="text-sm text-fg-muted">Spotify is quiet right now.</p>}

      {state.status === 'ready' && (
        <a
          href={state.track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 rounded-lg"
        >
          <Image
            src={state.track.albumImageUrl}
            alt=""
            width={56}
            height={56}
            sizes="56px"
            className="h-14 w-14 shrink-0 rounded-lg object-cover"
          />
          <span className="min-w-0">
            <span className="block truncate font-semibold group-hover:underline">{state.track.title}</span>
            <span className="block truncate text-sm text-fg-muted">{state.track.artist}</span>
          </span>
        </a>
      )}
    </div>
  );
}
