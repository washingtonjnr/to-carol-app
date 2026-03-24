export type ActiveSection =
  | 'hero'
  | 'your-story'
  | 'timeline'
  | 'gallery'
  | 'love-letter';

export interface GalleryPhoto {
  name: string;
  url: string;
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
  selectedPhotoName: string | null;
  lightboxOpen: boolean;
  loading: boolean;
  error: string | null;
}
