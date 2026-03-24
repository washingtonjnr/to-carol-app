import { createReducer, on } from '@ngrx/store';
import { GalleryState, NavState } from '@app/core/store/app.state';
import {
  closeMenu, closeLightbox, loadPhotos, loadPhotosFailure, loadPhotosSuccess,
  nextPhoto, openLightbox, prevPhoto, setActiveSection, toggleMenu,
} from '@app/core/store/app.actions';

// Nav
const navInitial: NavState = { activeSection: 'hero', menuOpen: false };

export const navReducer = createReducer(
  navInitial,
  on(setActiveSection, (state, { section }) => ({ ...state, activeSection: section })),
  on(toggleMenu, state => ({ ...state, menuOpen: !state.menuOpen })),
  on(closeMenu,  state => ({ ...state, menuOpen: false }))
);

// Gallery
const galleryInitial: GalleryState = {
  photos: [],
  selectedPhotoName: null,
  lightboxOpen: false,
  loading: false,
  error: null,
};

export const galleryReducer = createReducer(
  galleryInitial,
  on(loadPhotos,
    state => ({ ...state, loading: true, error: null })),
  on(loadPhotosSuccess,
    (state, { photos }) => ({ ...state, loading: false, photos })),
  on(loadPhotosFailure,
    (state, { error }) => ({ ...state, loading: false, error })),

  on(openLightbox,  (state, { photoName }) => ({ ...state, lightboxOpen: true, selectedPhotoName: photoName })),
  on(closeLightbox, state => ({ ...state, lightboxOpen: false, selectedPhotoName: null })),
  on(nextPhoto, state => {
    const names = state.photos.map(p => p.name);
    const next  = names[(names.indexOf(state.selectedPhotoName!) + 1) % names.length];
    return { ...state, selectedPhotoName: next };
  }),
  on(prevPhoto, state => {
    const names = state.photos.map(p => p.name);
    const prev  = names[(names.indexOf(state.selectedPhotoName!) - 1 + names.length) % names.length];
    return { ...state, selectedPhotoName: prev };
  })
);
