import {AfterViewInit, Component} from '@angular/core';
import {MotionsHttpService} from "../services/motions.http-service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Page} from "../services/pages";
import {combineLatest, distinctUntilChanged, map, Observable, switchMap, tap} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MotionGroupsDisplayComponent} from "../motion-groups-display/motion-groups-display.component";
import {TranslateModule} from "@ngx-translate/core";
import {PaginationComponent} from "../pagination/pagination.component";
import {SearchBarComponent, SearchQuery} from "../search-bar/search-bar.component";
import {MotionGroup} from "../services/motions";

@Component({
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    TranslateModule,
    AsyncPipe,
    SearchBarComponent,
    MotionGroupsDisplayComponent,
    PaginationComponent,
  ],
  templateUrl: './motions.component.html',
  styleUrl: './motions.component.sass'
})
export class MotionsComponent implements AfterViewInit {

  searchTerm = ''
  result$!: Observable<Page<MotionGroup>>
  isLoading = false

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private motionsHttpService: MotionsHttpService
  ) {
  }

  ngAfterViewInit(): void {
    this.result$ = combineLatest([
      this.route.params,
      this.route.queryParams
    ]).pipe(
      map(([params, queryParams]) => ({
        params,
        queryParams
      })),
      map(({params, queryParams}) => {
        // TODO: use scroll api?
        // Elastic doesn't like it if you request beyond item 10000
        //Result window is too large, from + size must be less than or equal to: [10000] but was [10010]. See the scroll api for a more efficient way to request large data sets. This limit can be set by changing the [index.max_result_window] index level setting.
        let page = Math.min(1000, Number(queryParams["page"]) || 1);
        return ({id: params["id"], q: queryParams["q"] || '', minDate: queryParams["start"], maxDate: queryParams["end"], page: page || 1});
      }),
      distinctUntilChanged(),
      tap((it) => {
        this.searchTerm = it.q;
        this.isLoading = true
      }),
      switchMap(({id, q, minDate, maxDate, page}) => {
        if (!id) {
          return this.motionsHttpService.getMotions(page, q, minDate, maxDate)
        } else {
          return this.motionsHttpService.getMotion(id)
        }
      }),
      tap(() => this.isLoading = false),
    )
  }

  newSearch(q: SearchQuery) {
    this.router.navigate(['/motions'], {
      queryParams: {q: q.q, start: q.minDate, end: q.maxDate}
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
}
