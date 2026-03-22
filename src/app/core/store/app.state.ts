export type ActiveSection =
  | 'hero'
  | 'our-story'
  | 'timeline'
  | 'gallery'
  | 'love-letter';

export interface GalleryPhoto {
  id: number;
  src: string;
  alt: string;
  caption: string;
}

export interface AppState {
  nav: NavState;
  gallery: GalleryState;
}

export interface NavState {
  activeSection: ActiveSection;
  menuOpen: boolean;
}

export interface GalleryState {
  photos: GalleryPhoto[];
  selectedPhotoId: number | null;
  lightboxOpen: boolean;
  loading: boolean;
  error: string | null;
}
