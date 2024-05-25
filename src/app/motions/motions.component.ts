/*motions.component.ts*/
import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Motion, MotionsHttpService, Votes,} from '../services/motions.http-service';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {Observable, ReplaySubject, Subscription, take} from 'rxjs';
import {PaginationComponent} from '../pagination/pagination.component';
import {SortPipe} from '../sort-votes/sort-votes.pipe';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {LanguageService} from "../services/language.service";
import {Page} from "../services/pages";
import {ActivatedRoute} from "@angular/router";

@UntilDestroy()
@Component({
  selector: 'motions',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    PaginationComponent,
    SortPipe,
  ],
  templateUrl: './motions.component.html',
  styleUrl: './motions.component.sass',
})
export class MotionsComponent implements OnInit, OnDestroy {
  motions$$ = new ReplaySubject<ViewMotion[]>(1);
  nrOfPages: number = 1;
  searchTerm: string = '';
  motionId: string = '';
  selectedLanguage: string = 'NL';
  private languageSubscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
              private motionsHttpService: MotionsHttpService,
              private languageService: LanguageService) {
  }

  ngOnInit() {
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.selectedLanguage = language;
    })
    this.route.params.subscribe(params => {
      this.motionId = params['id'];
      if (this.motionId === undefined)// Access the 'id' parameter from the URL
        this.motionId = ''
      if (this.motionId && '' != this.motionId) {
        this.searchTerm = ''
        this.getById()
      }
    });
  }

  removeSpaces(input: string): string {
    return input.replace(/\s+/g, '');
  }

  searchMotions(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.motionId = '';
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

  private getById() {
    this.motionsHttpService
      .getMotion(this.motionId)
      .pipe(untilDestroyed(this), take(1))
      .subscribe((page: Page<Motion>) => {
        this.motions$$.next(page.values.map((x) => new ViewMotion(x)));
        this.nrOfPages = page.totalPages;
      });
  }

  getPagedMotions(page: number): void {
    if (this.motionId.trim().length !== 0) {
      return
    }
    this.loadMotions(page)
      .pipe(untilDestroyed(this))
      .subscribe((page: Page<Motion>) => {
        this.motions$$.next(page.values.map((x) => new ViewMotion(x)));
        this.nrOfPages = page.totalPages;
      });
  }

  //TODO: is .take still necessary
  private loadMotions(page: number): Observable<Page<Motion>> {
    return this.motionsHttpService
      .getMotions(page, this.searchTerm)
      .pipe(take(1));
  }


  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}

class ViewMotion {
  get votingDate(): string {
    return this.motion.votingDate;
  }

  get titleNL(): string {
    return this.motion.titleNL;
  }

  get id(): string {
    return this.motion.id;
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
    return this.motion.yesVotes;
  }

  get noVotes(): Votes {
    return this.motion.noVotes;
  }

  get absVotes(): Votes {
    return this.motion.absVotes;
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
