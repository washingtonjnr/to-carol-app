import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { routes } from '@app/modules/modules.routes';
import { galleryReducer, navReducer } from '@app/core/store/app.reducers';
import { loadPhotosEffect } from '@app/core/store/app.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ nav: navReducer, gallery: galleryReducer }),
    provideEffects({ loadPhotosEffect }),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
};
