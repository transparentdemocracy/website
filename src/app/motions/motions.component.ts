/*motions.component.ts*/
import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {Motion, MotionsHttpService, Page, Votes,} from '../services/motions.http-service';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {Observable, ReplaySubject, take} from 'rxjs';
import {PaginationComponent} from '../pagination/pagination.component';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

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
  nrOfPages: number = 1;
  searchTerm: string = "";

  constructor(private motionsHttpService: MotionsHttpService) {
  }

  searchMotions(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.executeNewSearch();
  }

  private executeNewSearch() {
    this.motionsHttpService
      .getMotions(1, this.searchTerm)
      .pipe(untilDestroyed(this), take(1))
      .subscribe((page: Page<Motion>) => {
        this.motions$$.next(page.values.map((x) => new ViewMotion(x)));
        this.nrOfPages = page.totalPages;
      });
  }

  getPagedMotions(page: number): void {
    this.loadMotions(page)
      .pipe(untilDestroyed(this))
      .subscribe((page: Page<Motion>) => {
        this.motions$$.next(page.values.map((x) => new ViewMotion(x)));
        this.nrOfPages = page.totalPages;
      });
  }

  //TODO: is .take still necessary
  private loadMotions(page: number): Observable<Page<Motion>> {
    return this.motionsHttpService.getMotions(page, this.searchTerm).pipe(take(1));
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
  get yesVotes(): Votes {
    return this.motion.yesVotes
  }
  get noVotes(): Votes {
    return this.motion.noVotes
  }
  get absVotes(): Votes {
    return this.motion.absVotes
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
export class MotionsComponentMock {
}
