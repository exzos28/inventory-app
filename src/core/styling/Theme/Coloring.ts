import lightPalette from './lightPalette';

export interface Coloring {
  readonly palette: Readonly<Palette>;
}

export type Palette = {
  [P in ColorKey]: string;
};

export type ColorKey = keyof typeof lightPalette;
