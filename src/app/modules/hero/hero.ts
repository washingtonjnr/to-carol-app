import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setActiveSection } from '@app/core/store/app.actions';

@Component({
  selector: 'app-hero',
  standalone: true,
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class HeroComponent {
  private store = inject(Store);

  scrollDown() {
    const el = document.getElementById('your-story');

    el?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    
    this.store.dispatch(setActiveSection({ section: 'your-story' }));
  }
}
