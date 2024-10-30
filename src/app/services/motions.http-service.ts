import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs';
import {Page} from './pages';
import {MotionGroup} from './motions';
import {environment} from "../../environments/environment";
import {ElasticSearch, SearchHit} from "./elastic";

@Injectable({
  providedIn: 'root',
})
export class MotionsHttpService {


  constructor(private http: HttpClient) {
  }

  getMotions(page: number, searchTerm: string): Observable<Page<MotionGroup>> {
    return this.fetchMotions(page, searchTerm);
  }

  getMotion(motionId: string): Observable<Page<MotionGroup>> {
    let completeUrl = this.buildUrlById(motionId);
    return this.fetchById(completeUrl).pipe(
      map((backendPage: SearchHit<MotionGroup>) => {
        return this.mapSingleBackendMotion(backendPage._source)
      })
    );
  }

  private fetchById(completeUrl: string): Observable<SearchHit<MotionGroup>> {
    return this.http.get<SearchHit<MotionGroup>>(completeUrl);
  }

  private fetchMotions(
    page: number,
    searchTerm: string | null
  ): Observable<Page<MotionGroup>> {
    return this.fetchMotionsElastic(searchTerm, page);
  }

  private fetchMotionsElastic(
    searchTerm: string | null,
    page: number,
  ): Observable<Page<MotionGroup>> {
    const PAGE_SIZE = 10;
    // TODO How much search fanciness do we need?
    // TODO If search returns empty, expand search with wildcards?
    let query = this.createSearchQuery(PAGE_SIZE, searchTerm);
    return this.http.post<ElasticSearch<MotionGroup>>(`${environment.elasticUrl}motions/_search`, query)
      .pipe(map(v => ({
            pageNr: page,
            pageSize: PAGE_SIZE,
            totalPages: Math.ceil(v.hits.total.value / PAGE_SIZE),
            values: v.hits.hits.map(it => it._source)
          })
        )
      )
  }


  private createSearchQuery(PAGE_SIZE: number, searchText: string | null) {
    let query: any = {
      size: PAGE_SIZE,
    };
    if (searchText && searchText !== '') {
      query.query = {
        query_string: {
          query: `${searchText}`
        }
      }
    }
    return query;
  }

  private buildUrl(searchTerm: string | null, page: number) {
    let motionUrl = `${(environment.backendUrl)}motions/`;
    let searchTermPart =
      searchTerm == null || searchTerm == `` ? `` : `search=${searchTerm}&`;
    let pagePart = `page=${page}&size=10`;
    return `${motionUrl}?${searchTermPart}${pagePart}`;
  }

  private buildUrlById(motionId: string) {
    return `${(environment.elasticUrl)}motions/_doc/${motionId}`;
  }

  private mapSingleBackendMotion(motionGroup: MotionGroup | null): Page<MotionGroup> {
    return {
      pageNr: 1,
      pageSize: 1,
      totalPages: 1,
      values: motionGroup ? [motionGroup] : [],
    };
  }
}
