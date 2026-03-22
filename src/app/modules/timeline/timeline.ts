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
      description: 'I still remember the exact moment. The way you laughed, the way time slowed down. I knew something was different.',
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
      description: 'There was a quiet Tuesday when I looked at you doing something ordinary and realised — this is it. You are it.',
      icon: '💡',
    },
    {
      date: 'Adventures',
      title: 'Our First Trip',
      description: 'New places, new memories, same you. Travelling with you showed me a different kind of freedom.',
      icon: '✈️',
    },
    {
      date: 'Always',
      title: 'Every Day Since',
      description: 'The best parts of my days are the ones with you in them. I am grateful for every single one.',
      icon: '♡',
    },
  ];
}
