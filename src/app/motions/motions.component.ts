import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Motion, MotionsHttpService } from '../services/motions.http-service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'motions',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './motions.component.html',
  styleUrl: './motions.component.sass',
})
export class MotionsComponent implements OnInit {
  motions$$ = new ReplaySubject<Motion[]>(1);

  constructor(private motionsHttpService: MotionsHttpService) {}

  ngOnInit(): void {
    this.getMotions();
  }

  getMotions(): void {
    this.motionsHttpService.getMotions().subscribe((motions: Motion[]) => {
      this.motions$$.next(motions);
    });
  }

  getNewMotions(motionId: string): void {
    this.motionsHttpService.getMotion(motionId).subscribe((motion: Motion) => {
      this.motions$$.next([motion]);
    });
  }
}

@Component({
  selector: 'motions',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class MotionsComponentMock  {}

