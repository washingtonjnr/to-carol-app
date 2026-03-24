import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { closeMenu, toggleMenu } from '@app/core/store/app.actions';
import { selectActiveSection, selectMenuOpen } from '@app/core/store/app.selectors';
import { ActiveSection } from '@app/core/store/app.state';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class NavbarComponent {
  private store = inject(Store);

  activeSection$ = this.store.select(selectActiveSection);
  menuOpen$ = this.store.select(selectMenuOpen);
  scrolled = false;

  links: { id: ActiveSection; label: string }[] = [
    { id: 'your-story', label: 'Your Story' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'love-letter', label: 'Letter' },
  ];

  @HostListener('window:scroll')
  onScroll() { this.scrolled = window.scrollY > 60; }

  scrollTo(section: ActiveSection) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });

    this.store.dispatch(closeMenu());
  }

  toggle() { this.store.dispatch(toggleMenu()); }
}
