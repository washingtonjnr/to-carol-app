import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { closeLightbox, nextPhoto, openLightbox, prevPhoto } from '@app/core/store/app.actions';
import { selectLightboxOpen, selectPhotos, selectPhotosError, selectPhotosLoading, selectSelectedPhoto } from '@app/core/store/app.selectors';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gallery.html',
  styleUrl: './gallery.scss',
})
export class GalleryComponent {
  private store = inject(Store);

  photos$       = this.store.select(selectPhotos);
  lightboxOpen$ = this.store.select(selectLightboxOpen);
  selected$     = this.store.select(selectSelectedPhoto);
  loading$      = this.store.select(selectPhotosLoading);
  error$        = this.store.select(selectPhotosError);

  open(id: number)  { this.store.dispatch(openLightbox({ photoId: id })); }
  close()           { this.store.dispatch(closeLightbox()); }
  next()            { this.store.dispatch(nextPhoto()); }
  prev()            { this.store.dispatch(prevPhoto()); }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (e.key === 'Escape')     this.close();
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft')  this.prev();
  }
}
