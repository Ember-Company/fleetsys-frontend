import type { SxProps } from '@mui/system';

type AnimationType = 'scale' | 'fade' | 'slide';

type Animations = Record<AnimationType, SxProps>;

export const animations: Animations = {
  scale: {
    transform: 'scale(1)',
    transition: `transform 0.35s ease-in-out`,
    ':hover': { transform: 'scale(1.05)' },
  },
  fade: {
    opacity: 1,
    transition: `opacity 0.35s ease-in-out`,
  },
  slide: {
    transform: 'translateY(0)',
    transition: `transform 0.35s ease-in-out`,
  },
};
