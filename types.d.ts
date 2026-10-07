import { ThreeElements } from '@react-three/fiber'

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  const component: ComponentType;
  export default component;
}


declare global {
  namespace React {
    namespace JSX {
      type IntrinsicElements = ThreeElements;
    }
  }
}
