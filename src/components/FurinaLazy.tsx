'use client';
import dynamic from 'next/dynamic';

// The root not-found boundary ships with every route, so the Three.js model
// must load lazily or it ends up in the home bundle.
const Furina = dynamic(() => import('@/components/FurinaModel'), {
  ssr: false,
  loading: () => <div className="mb-4 h-64 w-64" aria-hidden="true" />,
});

export default function FurinaLazy() {
  return <Furina />;
}
