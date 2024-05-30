/*plenaries.component.ts*/
import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Observable, ReplaySubject, Subscription, take } from 'rxjs';
import { PaginationComponent } from '../pagination/pagination.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LanguageService } from '../services/language.service';
import {
  MotionLink,
  PlenariesHttpService,
  Plenary,
} from '../services/plenaries.http-service';
import { Page } from '../services/pages';
import { RouterLink } from '@angular/router';
import { dateConversion } from '../services/date-service';
import { TranslateModule } from '@ngx-translate/core';

@UntilDestroy()
@Component({
  selector: 'plenaries',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent,
    PaginationComponent,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './plenaries.component.html',
  styleUrl: './plenaries.component.sass',
})
export class PlenariesComponent implements OnInit, OnDestroy {
  plenaries$$ = new ReplaySubject<ViewPlenary[]>(1);
  nrOfPages: number = 1;
  searchTerm: string = '';
  selectedLanguage: string = 'nl';
  private languageSubscription: Subscription = new Subscription();

  constructor(
    private plenariesHttpService: PlenariesHttpService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        this.selectedLanguage = language;
      }
    );
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  searchPlenaries(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.executeNewSearch();
  }

  private executeNewSearch() {
    this.plenariesHttpService
      .getPlenaries(1, this.searchTerm)
      .pipe(untilDestroyed(this), take(1))
      .subscribe((page: Page<Plenary>) => {
        this.plenaries$$.next(page.values.map((x) => new ViewPlenary(x)));
        this.nrOfPages = page.totalPages;
      });
  }

  getPagedPlenaries(page: number): void {
    this.loadPlenaries(page)
      .pipe(untilDestroyed(this))
      .subscribe((page: Page<Plenary>) => {
        this.plenaries$$.next(page.values.map((x) => new ViewPlenary(x)));
        this.nrOfPages = page.totalPages;
      });
  }

  private loadPlenaries(page: number): Observable<Page<Plenary>> {
    return this.plenariesHttpService
      .getPlenaries(page, this.searchTerm)
      .pipe(take(1));
  }
}

class ViewPlenary {
  get titleNL(): string {
    return 'Plenaire vergadering ' + this.plenary.id;
  }

  get titleFR(): string {
    return 'Séance plénière ' + this.plenary.id;
  }

  get date(): string {
    return dateConversion(this.plenary.date);
  }

  get legislature(): string {
    return this.plenary.legislature;
  }

  get nrOfMotions(): number {
    console.log('this.plenary.motions: ', this.plenary.motions);
    return this.plenary.motions.length;
  }

  get motions(): MotionLink[] {
    return this.plenary.motions;
  }

  constructor(p: Plenary) {
    this.plenary = p;
    this.isExpanded = false;
  }

  plenary: Plenary;
  isExpanded: boolean;
}
