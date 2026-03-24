import { Component } from '@angular/core';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-timeline',
  standalone: true,
  templateUrl: './timeline.html',
  styleUrl: './timeline.scss',
})
export class TimelineComponent {
  events: TimelineEvent[] = [
    {
      date: 'The beginning',
      title: 'The Day We Met',
      description: 'I saw you on Instagram, sent a message, and asked you to a museum. It could’ve been awkward, but it wasn’t. From the start, it just felt easy, like something was already there. And after that, we never really stopped… (alguns meses ali, mas enfim)',
      icon: '✨',
    },
    {
      date: 'First steps',
      title: 'Our First Date',
      description: 'Nervous, hopeful, and completely captivated. Every word you said made me want to hear more.',
      icon: '🌹',
    },
    {
      date: 'A moment',
      title: 'When I Knew',
      description: 'When I realized I was spending the whole week just waiting for the end of it, because that’s when I’d get to be with you.',
      icon: '💡',
    },
    {
      date: 'Adventures',
      title: 'Our First Trip',
      description: 'New places, new memories, same you. Travelling with you showed me a different kind of freedom. Bom demais',
      icon: '✈️',
    },
    {
      date: 'Always',
      title: 'Every Day Since',
      description: 'The best moments of my days are the ones when you’re there. Meu lugar favotiro é do seu lado.',
      icon: '♡',
    },
  ];
}
