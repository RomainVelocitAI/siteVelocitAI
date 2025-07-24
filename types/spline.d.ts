declare module '@splinetool/react-spline' {
  import { FC, HTMLAttributes } from 'react';
  import { Application } from '@splinetool/runtime';
  
  export interface SplineEvent {
    target: {
      name: string;
      id: string;
    };
  }
  
  export interface SplineProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onLoad' | 'onMouseDown' | 'onMouseUp' | 'onMouseHover' | 'onKeyDown' | 'onKeyUp' | 'onWheel'> {
    scene: string;
    onLoad?: (e: Application) => void;
    onMouseDown?: (e: SplineEvent) => void;
    onMouseUp?: (e: SplineEvent) => void;
    onMouseHover?: (e: SplineEvent) => void;
    onKeyDown?: (e: SplineEvent) => void;
    onKeyUp?: (e: SplineEvent) => void;
    onStart?: (e: SplineEvent) => void;
    onLookAt?: (e: SplineEvent) => void;
    onFollow?: (e: SplineEvent) => void;
    onWheel?: (e: SplineEvent) => void;
    renderOnDemand?: boolean;
  }
  
  const Spline: FC<SplineProps>;
  export default Spline;
}