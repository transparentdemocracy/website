/*plenaries.component.ts*/
import {CommonModule} from '@angular/common';
import {AfterViewInit, Component} from '@angular/core';
import {distinctUntilChanged, map, Observable, switchMap, tap} from 'rxjs';
import {PaginationComponent} from '../pagination/pagination.component';
import {UntilDestroy} from '@ngneat/until-destroy';
import {LanguagePluralPipe} from '../language/pluralization/language-plural.pipe';
import {MotionGroupLink, PlenariesHttpService, Plenary,} from '../services/plenaries.http-service';
import {Page} from '../services/pages';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCaretRight} from "@fortawesome/free-solid-svg-icons";
import {NewSearchBarComponent} from "../new-search-bar/new-search-bar.component";
import {LanguageService} from "../services/language.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@UntilDestroy()
@Component({
  selector: 'plenaries',
  standalone: true,
  imports: [
    CommonModule,
    NewSearchBarComponent,
    PaginationComponent,
    RouterLink,
    TranslateModule,
    LanguagePluralPipe,
    FaIconComponent,
    PaginationComponent,
  ],
  templateUrl: './plenaries.component.html',
  styleUrl: './plenaries.component.sass',
})
export class PlenariesComponent implements AfterViewInit {
  searchTerm = ''
  result$!: Observable<Page<ViewPlenary>>
  isLoading = false
  selectedLanguage!: string;

  caretRight = faCaretRight;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpService: PlenariesHttpService,
    private languageService: LanguageService,
  ) {
    languageService.language$.pipe(
      takeUntilDestroyed()
    ).subscribe(language => this.selectedLanguage = language)
  }

  ngAfterViewInit(): void {
    this.result$ = this.route.queryParams
      .pipe(
        map(queryParams => {
          // TODO: use scroll api?
          // Elastic doesn't like it if you request beyond item 10000
          //Result window is too large, from + size must be less than or equal to: [10000] but was [10010]. See the scroll api for a more efficient way to request large data sets. This limit can be set by changing the [index.max_result_window] index level setting.
          let page = Math.min(1000, Number(queryParams["page"]) || 1);
          return ({q: queryParams["q"] || '', page: page || 1});
        }),
        distinctUntilChanged(),
        tap((it) => {
          this.searchTerm = it.q;
          this.isLoading = true
        }),
        switchMap(({q, page}) => {
          return this.httpService.getPlenaries(page, q)
        }),
        map(page => ({...page, values: page.values.map(p => this.toViewPlenary(p))})),
        tap(() => this.isLoading = false),
      )
  }

  newSearch(searchTerm: string) {
    this.router.navigate(['/plenaries'], {
      queryParams: {q: searchTerm}
    })
  }

  goToPage(pageNumber: number) {
    this.router.navigate([], {
      queryParams: {
        q: this.searchTerm,
        page: pageNumber
      }
    })
  }

  toViewPlenary(plenary: Plenary): ViewPlenary {
    return {
      ...plenary,
      plenary: plenary,
      nrOfMotions: plenary.motionGroups.length,
      isExpanded: false,
      titleNL: 'Plenaire vergadering ' + plenary.title,
      titleFR: 'Réunion plénière ' + plenary.title,
    }
  }
}

interface ViewPlenary {
  id: string;
  title: string;
  legislature: string;
  date: string;
  pdfReportUrl: string;
  htmlReportUrl: string;
  motionGroups: MotionGroupLink[];
  nrOfMotions: number;
  titleNL: string;
  titleFR: string;
  plenary: Plenary;
  isExpanded: boolean;
}
