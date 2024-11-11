import {AfterViewInit, Component} from '@angular/core';
import {MotionsHttpService} from "../services/motions.http-service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {Page} from "../services/pages";
import {combineLatest, distinctUntilChanged, map, Observable, switchMap, tap} from "rxjs";
import {AsyncPipe, JsonPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PaginationComponent} from "../pagination/pagination.component";
import {MotionGroupsDisplayComponent, ViewMotionGroup} from "../motions/motion-group-display/motion-groups-display.component";
import {TranslateModule} from "@ngx-translate/core";
import {NewPaginationComponent} from "../new-pagination/new-pagination.component";
import {NewSearchBarComponent} from "../new-search-bar/new-search-bar.component";

@Component({
    selector: 'new-motions',
    standalone: true,
    imports: [
        RouterModule,
        FormsModule,
        TranslateModule,
        AsyncPipe,
        JsonPipe,
        PaginationComponent,
        NewSearchBarComponent,
        MotionGroupsDisplayComponent,
        NewPaginationComponent,
    ],
    templateUrl: './new-motions.component.html',
    styleUrl: './new-motions.component.sass'
})
export class NewMotionsComponent implements AfterViewInit {

    searchTerm = ''
    result$!: Observable<Page<ViewMotionGroup>>
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
                return ({id: params["id"], q: queryParams["q"] || '', page: page || 1});
            }),
            distinctUntilChanged(),
            tap((it) => {
                this.searchTerm = it.q;
                this.isLoading = true
            }),
            switchMap(({id, q, page}) => {
                if (!id) {
                    return this.motionsHttpService.getMotions(page, q)
                } else {
                    return this.motionsHttpService.getMotion(id)
                }
            }),
            map(result => ({...result, values: result.values.map(mg => new ViewMotionGroup(mg))})),
            tap(() => this.isLoading = false)
        )
    }

    newSearch(searchTerm: string) {
        this.router.navigate(['/motions2'], {
            queryParams: {q: searchTerm}
        })
    }

    goToPage(pageNumber: number) {
        this.router.navigate([], {
            queryParams: {
                q: this.route.snapshot.queryParams["q"],
                page: pageNumber
            }
        })
    }
}
