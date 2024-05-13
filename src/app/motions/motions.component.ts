/*motions.component.ts*/
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Motion, MotionsHttpService } from '../services/motions.http-service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Observable, ReplaySubject, Subscription, take } from 'rxjs';
import { PaginationComponent } from '../pagination/pagination.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'motions',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, PaginationComponent],
  templateUrl: './motions.component.html',
  styleUrl: './motions.component.sass',
})
export class MotionsComponent {
  motions$$ = new ReplaySubject<ViewMotion[]>(1);

  constructor(private motionsHttpService: MotionsHttpService) {}

  private getMotions(): Observable<Motion[]> {
    return this.motionsHttpService.getMotions().pipe(take(1));
  }

  getNewMotions(searchTerm: string): void {
    this.motionsHttpService
      .findMotions(searchTerm)
      .pipe(untilDestroyed(this), take(1))
      .subscribe((motions: Motion[]) => {
        this.motions$$.next(motions.map((x) => new ViewMotion(x)));
      });
  }

  getPage(page: number): void {
    console.log(`we can fetch page ${page} here`);
    this.getMotions()
      .pipe(untilDestroyed(this))
      .subscribe((motions: Motion[]) => {
        this.motions$$.next(motions.map((x) => new ViewMotion(x)));
      });
  }
}

class ViewMotion {
  get votingDate(): string {
    return this.motion.votingDate;
  }

  get titleNL(): string {
    return this.motion.titleNL;
  }

  get descriptionNL(): string {
    return this.motion.descriptionNL;
  }

  get titleFR(): string {
    return this.motion.titleFR;
  }

  get descriptionFR(): string {
    return this.motion.descriptionFR;
  }

  get nrOfYesVotes(): number {
    return this.motion.nrOfYesVotes;
  }

  get nrOfNoVotes(): number {
    return this.motion.nrOfNoVotes;
  }

  get nrOfAbsentVotes(): number {
    return this.motion.nrOfAbsentVotes;
  }

  get votingResult(): boolean {
    return this.motion.votingResult;
  }

  constructor(m: Motion) {
    this.motion = m;
    this.isExpanded = false;
  }

  motion: Motion;
  isExpanded: boolean;
}

@Component({
  selector: 'motions',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class MotionsComponentMock {}
