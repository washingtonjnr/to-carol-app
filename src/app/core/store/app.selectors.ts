import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GalleryState, NavState } from '@app/core/store/app.state';

export const selectNav = createFeatureSelector<NavState>('nav');

export const selectActiveSection = createSelector(selectNav, s => s.activeSection);
export const selectMenuOpen      = createSelector(selectNav, s => s.menuOpen);

export const selectGallery = createFeatureSelector<GalleryState>('gallery');

export const selectPhotos        = createSelector(selectGallery, s => s.photos);
export const selectLightboxOpen  = createSelector(selectGallery, s => s.lightboxOpen);
export const selectPhotosLoading = createSelector(selectGallery, s => s.loading);
export const selectPhotosError   = createSelector(selectGallery, s => s.error);
export const selectSelectedPhoto = createSelector(selectGallery, s =>
  s.photos.find(p => p.id === s.selectedPhotoId) ?? null
);
