import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { loadPhotos, setActiveSection } from '@app/core/store/app.actions';
import { ActiveSection } from '@app/core/store/app.state';
import { NavbarComponent } from '@app/shared/components/navbar/navbar';
import { FooterComponent } from '@app/shared/components/footer/footer';
import { HeroComponent } from '@app/modules/hero/hero';
import { OurStoryComponent } from '@app/modules/our-story/our-story';
import { TimelineComponent } from '@app/modules/timeline/timeline';
import { GalleryComponent } from '@app/modules/gallery/gallery';
import { LoveLetterComponent } from '@app/modules/love-letter/love-letter';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent,
    HeroComponent,
    OurStoryComponent,
    TimelineComponent,
    GalleryComponent,
    LoveLetterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit, OnDestroy {
  private store = inject(Store);
  private observer!: IntersectionObserver;

  private sections: ActiveSection[] = [
    'hero', 'our-story', 'timeline', 'gallery', 'love-letter',
  ];

  ngOnInit() {
    this.store.dispatch(loadPhotos());

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.store.dispatch(setActiveSection({ section: entry.target.id as ActiveSection }));
          }
        });
      },
      { threshold: 0.4 }
    );

    this.sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
