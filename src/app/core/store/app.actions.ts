import { createAction, props } from '@ngrx/store';
import { ActiveSection, GalleryPhoto } from '@app/core/store/app.state';

// Nav
export const setActiveSection = createAction(
  '[Nav] Set Active Section',
  props<{ section: ActiveSection }>()
);
export const toggleMenu = createAction('[Nav] Toggle Menu');
export const closeMenu  = createAction('[Nav] Close Menu');

// Gallery – lightbox
export const openLightbox  = createAction('[Gallery] Open Lightbox',  props<{ photoName: string }>());
export const closeLightbox = createAction('[Gallery] Close Lightbox');
export const nextPhoto     = createAction('[Gallery] Next Photo');
export const prevPhoto     = createAction('[Gallery] Prev Photo');

// Gallery – load photos
export const loadPhotos         = createAction('[Gallery] Load Photos');
export const loadPhotosSuccess  = createAction('[Gallery] Load Photos Success', props<{ photos: GalleryPhoto[] }>());
export const loadPhotosFailure  = createAction('[Gallery] Load Photos Failure', props<{ error: string }>());
