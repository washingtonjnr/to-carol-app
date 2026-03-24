import { Component, OnDestroy, OnInit, NgZone, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Howl } from 'howler';

export interface Track {
  title: string;
  artist: string;
  file: string;
}

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-player.html',
  styleUrl: './music-player.scss',
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  private zone = inject(NgZone);
  private startedByInteraction = false;

  playlist: Track[] = [
    // Best
    { "title": "Alma gêmea", "artist": "Emicida", "file": "emicida-alma-gemea.mp3" },
    { "title": "O melhor pedaço", "artist": "Sorriso Maroto", "file": "sorriso-melhor-pedaco.mp3" },
    { "title": "Best Part", "artist": "Daniel Caesar", "file": "daniel-best-part.mp3" },
    // ZAYN
    { "title": "There You Are", "artist": "ZAYN", "file": "zayn-there-you-are.mp3" },
    { "title": "Dusk Till Dawn (ft. Sia)", "artist": "ZAYN", "file": "zayn-dusk-till-dawn.mp3" },
    { "title": "Let Me", "artist": "ZAYN", "file": "zayn-let-me.mp3" },
    // Justin
    { "title": "Off My Face", "artist": "Justin Bieber", "file": "jb-off-my-face.mp3" },
    { "title": "Lifetime", "artist": "Justin Bieber", "file": "jb-lifetime.mp3" },
    { "title": "Anyone", "artist": "Justin Bieber", "file": "jb-anyone.mp3" },
    { "title": "Company", "artist": "Justin Bieber", "file": "jb-anyone.mp3" },
    // Shawn
    { "title": "Fallin' All in You", "artist": "Shawn Mendes", "file": "sm-fallin-all-in-you.mp3" },
    { "title": "Never Be Alone", "artist": "Shawn Mendes", "file": "sm-never-be-alone.mp3" },
    { "title": "Lost in Japan (Acoustic)", "artist": "Shawn Mendes", "file": "sm-lost-in-japan-acoustic.mp3" },
]

  currentIndex = signal(0);
  isPlaying    = signal(false);
  isExpanded   = signal(false);

  currentTrack = computed(() => this.playlist[this.currentIndex()]);

  private howl: Howl | null = null;
  private rafId = 0;

  ngOnInit(): void {
    const startOnInteraction = () => {
      if (this.startedByInteraction) return;

      this.startedByInteraction = true;
      
      document.removeEventListener('click', startOnInteraction);
      document.removeEventListener('keydown', startOnInteraction);
      document.removeEventListener('touchstart', startOnInteraction);

      this.zone.run(() => this.loadTrack(0, true));
    };

    document.addEventListener('click', startOnInteraction);
    document.addEventListener('keydown', startOnInteraction);
    document.addEventListener('touchstart', startOnInteraction);
  }

  toggleExpand() {
    this.isExpanded.update(v => !v);
  }

  togglePlay() {
    if (!this.howl) {
      this.loadTrack(this.currentIndex(), true);

      return;
    }

    if (this.isPlaying()) {
      this.howl.pause();
      this.isPlaying.set(false);

      cancelAnimationFrame(this.rafId);
    } else {
      this.howl.play();
      this.isPlaying.set(true);
    }
  }

  prev() {
    const idx = (this.currentIndex() - 1 + this.playlist.length) % this.playlist.length;
    this.loadTrack(idx, true);
  }

  next() {
    const idx = (this.currentIndex() + 1) % this.playlist.length;
    this.loadTrack(idx, true);
  }

  selectTrack(index: number) {
    this.loadTrack(index, true);
  }

  loadTrack(index: number, autoPlay: boolean) {
    this.howl?.unload();
    
    cancelAnimationFrame(this.rafId);

    this.currentIndex.set(index);
    this.isPlaying.set(false);

    const track = this.playlist[index];
    this.howl = new Howl({
      src: [`music/${track.file}`],
      html5: true,
      volume: 0.3,
      onend: () => this.zone.run(() => this.next()),
      onloaderror: (_id, err) => console.warn('Howler load error:', err),
    });

    if (autoPlay) {
      this.howl.play();
      this.isPlaying.set(true);
    }
  }

  ngOnDestroy() {
    this.howl?.unload();
    cancelAnimationFrame(this.rafId);
  }
}
