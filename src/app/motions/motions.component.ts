/*motions.component.ts*/
import {CommonModule} from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {MotionsHttpService} from '../services/motions.http-service';
import {SearchBarComponent} from '../search-bar/search-bar.component';
import {Observable, ReplaySubject, Subscription, take} from 'rxjs';
import {PaginationComponent} from '../pagination/pagination.component';
import {SortPipe} from '../sort-votes/sort-votes.pipe';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {LanguageService} from '../services/language.service';
import {Page} from '../services/pages';
import {ActivatedRoute} from '@angular/router';
import {DocumentReference, Motion, MotionGroup, Votes,} from '../services/motions';
import {dateConversion} from '../services/date-service';
import {TranslateModule} from '@ngx-translate/core';
import {LanguagePluralPipe} from '../language/pluralization/language-plural.pipe';
import {DocumentReferencesComponent} from '../document-references/document-references.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faCaretRight, faCheckCircle, faCircleInfo, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {MotionGroupsDisplayComponent, ViewMotionGroup} from "./motion-group-display/motion-groups-display.component";

@UntilDestroy()
@Component({
  selector: 'motions',
  standalone: true,
  imports: [
    FontAwesomeModule,
    CommonModule,
    DocumentReferencesComponent,
    SortPipe,
    TranslateModule,
    LanguagePluralPipe,
    SearchBarComponent,
    PaginationComponent,
    MotionGroupsDisplayComponent,
  ],
  templateUrl: './motions.component.html',
  styleUrl: './motions.component.sass',
})
export class MotionsComponent implements OnInit, OnDestroy {
  motionsGroups$$ = new ReplaySubject<ViewMotionGroup[]>(1);
  nrOfPages: number = 1;
  searchTerm: string = '';
  motionId: string = '';
  selectedLanguage: string = 'nl';
  private languageSubscription: Subscription = new Subscription();

  caretRight = faCaretRight;
  acceptedIcon = faCheckCircle;
  rejectedIcon = faTimesCircle;

  constructor(
    private route: ActivatedRoute,
    private motionsHttpService: MotionsHttpService,
    private languageService: LanguageService
  ) {
  }

  ngOnInit() {
    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        this.selectedLanguage = language;
      }
    );
    this.route.params.subscribe((params) => {
      this.motionId = params['id'];
      if (this.motionId === undefined) {
        // Access the 'id' parameter from the URL
        this.motionId = '';
      }
      if (this.motionId && '' != this.motionId) {
        this.searchTerm = '';
        this.getById();
      }
    });
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

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }
}

@Component({
  selector: 'motions',
  standalone: true,
  template: '<ng-content></ng-content>',
})
export class MotionsComponentMock {
}
