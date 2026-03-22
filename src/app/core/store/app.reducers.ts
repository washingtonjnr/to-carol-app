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
  selectedPhotoId: null,
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

  on(openLightbox,  (state, { photoId }) => ({ ...state, lightboxOpen: true, selectedPhotoId: photoId })),
  on(closeLightbox, state => ({ ...state, lightboxOpen: false, selectedPhotoId: null })),
  on(nextPhoto, state => {
    const ids  = state.photos.map(p => p.id);
    const next = ids[(ids.indexOf(state.selectedPhotoId!) + 1) % ids.length];
    return { ...state, selectedPhotoId: next };
  }),
  on(prevPhoto, state => {
    const ids  = state.photos.map(p => p.id);
    const prev = ids[(ids.indexOf(state.selectedPhotoId!) - 1 + ids.length) % ids.length];
    return { ...state, selectedPhotoId: prev };
  })
);
