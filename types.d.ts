import { ThreeElements } from '@react-three/fiber'

declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements extends ThreeElements {
      }
    }
  }

  interface NavItem {
    to: string;
    label: string;
  }

  interface AboutBoxProps {
    icon: ReactNode;
    title: string;
    children: ReactNode;
  }
  
  interface SliderProps {
    items: Tech[];
    speed?: number;
    gap?: number;
  }
  
  interface SpotifyTrack {
    songUrl: string
    title: string
    albumImageUrl: string
    artist: string
    isPlaying: boolean
  }
  
  interface Tech {
    icon: string;
    title: string;
    link: string;
  }

  interface Project {
    id: number;
    title: string;
    description: string;
    type: string;
    technologies: Tech[];
    imageUrl: string;
    githubUrl?: string;
    demoUrl?: string;
  };
}