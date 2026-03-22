import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { loadPhotos, loadPhotosFailure, loadPhotosSuccess } from '@app/core/store/app.actions';
import { PhotosService } from '@app/core/services/photos.service';

export const loadPhotosEffect = createEffect(
  (actions$ = inject(Actions), photosService = inject(PhotosService)) =>
    actions$.pipe(
      ofType(loadPhotos),
      switchMap(() =>
        photosService.getPhotos().pipe(
          map(photos => loadPhotosSuccess({ photos })),
          catchError(err  => of(loadPhotosFailure({ error: err.message ?? 'Failed to load photos' })))
        )
      )
    ),
  { functional: true }
);
