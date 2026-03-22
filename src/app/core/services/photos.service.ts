import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@app/core/http/http.service';
import { GalleryPhoto } from '@app/core/store/app.state';

@Injectable({ providedIn: 'root' })
export class PhotosService {
  private http = inject(HttpService);

  getPhotos(): Observable<GalleryPhoto[]> {
    return this.http.get<GalleryPhoto[]>('/photos');
  }
}
