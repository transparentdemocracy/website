/*motions.component.ts*/
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MotionsHttpService } from '../services/motions.http-service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Observable, ReplaySubject, Subscription, take } from 'rxjs';
import { PaginationComponent } from '../pagination/pagination.component';
import { SortPipe } from '../sort-votes/sort-votes.pipe';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LanguageService } from '../services/language.service';
import { Page } from '../services/pages';
import { ActivatedRoute } from '@angular/router';
import { Motion, MotionGroup, Votes } from '../services/motions';
import { dateConversion } from '../services/date-service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagePluralPipe } from '../language/pluralization/language-plural.pipe';

@UntilDestroy()
@Component({
  selector: 'motions',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    PaginationComponent,
    SortPipe,
    TranslateModule,
    LanguagePluralPipe,
  ],
  templateUrl: './motions.component.html',
  styleUrl: './motions.component.sass',
})
export class MotionsComponent implements OnInit, OnDestroy {
  paco = 5;
  motionsGroups$$ = new ReplaySubject<ViewMotionGroup[]>(1);
  nrOfPages: number = 1;
  searchTerm: string = '';
  motionId: string = '';
  selectedLanguage: string = 'nl';
  private languageSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private motionsHttpService: MotionsHttpService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        this.selectedLanguage = language;
      }
    );
    this.route.params.subscribe((params) => {
      this.motionId = params['id'];
      if (this.motionId === undefined)
        // Access the 'id' parameter from the URL
        this.motionId = '';
      if (this.motionId && '' != this.motionId) {
        this.searchTerm = '';
        this.getById();
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
      .subscribe((page: Page<MotionGroup>) => {
        this.motionsGroups$$.next(
          page.values.map((x) => new ViewMotionGroup(x))
        );
        this.nrOfPages = page.totalPages;
      });
  }

  private getById() {
    this.motionsHttpService
      .getMotion(this.motionId)
      .pipe(untilDestroyed(this), take(1))
      .subscribe((page: Page<MotionGroup>) => {
        this.motionsGroups$$.next(
          page.values.map((x) => new ViewMotionGroup(x))
        );
        this.nrOfPages = page.totalPages;
      });
  }

  getPagedMotions(page: number): void {
    if (this.motionId.trim().length !== 0) {
      return;
    }
    this.loadMotions(page)
      .pipe(untilDestroyed(this))
      .subscribe((page: Page<MotionGroup>) => {
        this.motionsGroups$$.next(
          page.values.map((x) => new ViewMotionGroup(x))
        );
        this.nrOfPages = page.totalPages;
      });
  }

  //TODO: is .take still necessary
  private loadMotions(page: number): Observable<Page<MotionGroup>> {
    return this.motionsHttpService
      .getMotions(page, this.searchTerm)
      .pipe(take(1));
  }

  toggleShowAllVotes(btnElement: HTMLElement, divElement: HTMLElement): void {
    divElement.classList.toggle('showAllVotes');
    btnElement.hidden = true;
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}

class ViewMotionGroup {
  constructor(m: MotionGroup) {
    this.motionGroup = m;
    this.isExpanded = false;
    this.viewMotions = m.motions.map((motion) => new ViewMotion(motion));
  }

  get titleNL(): string {
    return this.motionGroup.titleNL;
  }

  get motions(): ViewMotion[] {
    return this.viewMotions;
  }

  get id(): string {
    return this.motionGroup.id;
  }

  get titleFR(): string {
    return this.motionGroup.titleFR;
  }

  get votingDate(): string {
    return dateConversion(this.motionGroup.votingDate);
  }

  isExpanded: boolean;
  viewMotions: ViewMotion[];
  motionGroup: MotionGroup;
}

class ViewMotion {
  get votingDate(): string {
    return dateConversion(this.motion.votingDate);
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
export class MotionsComponentMock {}
