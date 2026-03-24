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

  photos$ = this.store.select(selectPhotos);
  error$ = this.store.select(selectPhotosError);
  loading$ = this.store.select(selectPhotosLoading);
  selected$ = this.store.select(selectSelectedPhoto);
  lightboxOpen = this.store.select(selectLightboxOpen);

  open(name: string) {
    this.store.dispatch(openLightbox({ photoName: name }));
  }
  
  close() { 
    this.store.dispatch(closeLightbox()); 
  }
  
  next() { 
    this.store.dispatch(nextPhoto()); 
  }
  
  prev() { 
    this.store.dispatch(prevPhoto()); 
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowRight') this.next();
    if (e.key === 'ArrowLeft') this.prev();
  }
}
