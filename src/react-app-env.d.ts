/// <reference types="react-scripts" />

declare module '*.glb' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
  const src: string;
  export default src;
}

declare module 'meshline' {
  export const MeshLineGeometry: any;
  export const MeshLineMaterial: any;
  export const raycast: any;
}

declare module '@react-three/fiber' {
  import * as React from 'react';
  export const Canvas: React.FC<any>;
  export const extend: (objects: any) => void;
  export const useFrame: (callback: (state: any, delta: number) => void, renderPriority?: number) => void;
  export const useThree: (selector?: (state: any) => any, equalityFn?: (a: any, b: any) => boolean) => any;
  export const useLoader: any;
  export const createPortal: any;
  export interface ThreeElements {
    [key: string]: any;
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      meshLineGeometry: any;
      meshLineMaterial: any;
      [elemName: string]: any;
    }
  }
}
