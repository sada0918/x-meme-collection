import { Theme } from '@x-meme-collection/shared-interfaces';
import { atom } from 'recoil';

// Create an atom for theme state
export const themeState = atom<Theme>({
  key: 'themeState',
  default: 'light',
});
