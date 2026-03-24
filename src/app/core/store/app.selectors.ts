import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GalleryPhoto, GalleryState, NavState } from '@app/core/store/app.state';

const VIDEO_EXTENSION = '.mp4';
const ALLOWED_VIDEO_PREFIXES = ['27.', '29.'] as const;

const isAllowedMedia = (photo: GalleryPhoto): boolean => {
  if (!photo.name.endsWith(VIDEO_EXTENSION)) return true;
  return ALLOWED_VIDEO_PREFIXES.some(prefix => photo.name.startsWith(prefix));
};

export const selectNav = createFeatureSelector<NavState>('nav');

export const selectActiveSection = createSelector(selectNav, s => s.activeSection);
export const selectMenuOpen = createSelector(selectNav, s => s.menuOpen);

// Gallery
export const selectGallery = createFeatureSelector<GalleryState>('gallery');

// Photos
export const selectPhotos = createSelector(
  selectGallery,
  ({ photos }) => photos.slice(1).filter(isAllowedMedia)
);
export const selectLightboxOpen = createSelector(selectGallery, s => s.lightboxOpen);
export const selectPhotosLoading = createSelector(selectGallery, s => s.loading);
export const selectPhotosError = createSelector(selectGallery, s => s.error);
export const selectSelectedPhoto = createSelector(selectGallery, s =>
  s.photos.find(p => p.name === s.selectedPhotoName) ?? null
);
export const selectFirstPhoto = createSelector(selectGallery, (s) => s.photos.find((p) => p.name.startsWith('27.')));
export const selectSecondPhoto = createSelector(selectGallery, (s) => s.photos.find((p) => p.name.startsWith('29.')));