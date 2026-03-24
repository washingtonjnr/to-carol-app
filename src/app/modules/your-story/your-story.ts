import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFirstPhoto, selectSecondPhoto } from '@src/app/core/store/app.selectors';

@Component({
  selector: 'app-your-story',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './your-story.html',
  styleUrl: './your-story.scss',
})
export class YourStoryComponent implements OnInit {
  private store = inject(Store);

  firstPhoto$ = this.store.select(selectFirstPhoto);
  secondPhoto$ = this.store.select(selectSecondPhoto);

  ngOnInit(): void {
    console.log("this.store")
  }
}
