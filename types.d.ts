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
    title: string;
    description: string;
    type: string;
    technologies: Tech[];
    imageUrl: string;
    githubUrl?: string;
    demoUrl?: string;
  };

  interface Experience {
    company: string;
    logo: string;
    position: string;
    period: string;
    website: string;
    description: string;
    achievements: string[];
  }
}