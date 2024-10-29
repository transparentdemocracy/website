import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs';
import {Page} from './pages';
import {MotionGroup} from './motions';
import {environment} from "../../environments/environment";

interface ElasticSearch<T> {
  hits: {
    total: {
      value: number
    },
    hits: SearchHit<T>[]
  }
}

interface SearchHit<T> {
  _source: T
}

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
      map((backendPage: MotionGroup | null) => {
        return this.mapSingleBackendMotion(backendPage);
      })
    );
  }

  private fetchById(completeUrl: string): Observable<MotionGroup | null> {
    return this.http.get<MotionGroup>(completeUrl);
  }

  private fetchMotions(
    page: number,
    searchTerm: string | null
  ): Observable<Page<MotionGroup>> {
    // return this.fetchMotionsBackend(searchTerm, page);
    return this.fetchMotionsElastic(searchTerm, page);
  }

  private fetchMotionsBackend(searchTerm: string | null, page: number) {
    let completeUrl = this.buildUrl(searchTerm, page);
    return this.http.get<Page<MotionGroup>>(completeUrl);
  }

  private fetchMotionsElastic(
    searchTerm: string | null,
    page: number,
  ): Observable<Page<MotionGroup>> {
    const PAGE_SIZE = 10;
    // TODO: add _source to only fetch the fields we need for search
    return this.http.post<ElasticSearch<MotionGroup>>(`${environment.elasticUrl}motions/_search`, this.createSearchQuery(PAGE_SIZE, searchTerm))
      .pipe(map(v => {
        console.log('ttt', v);
            return ({
              pageNr: page,
              pageSize: PAGE_SIZE,
              totalPages: Math.ceil(v.hits.total.value / PAGE_SIZE),
              values: v.hits.hits.map(it => it._source)
            })
          }
        )
      )
  }


  private createSearchQuery(PAGE_SIZE: number, searchTerm: string | null) {
    let query: any = {
      size: PAGE_SIZE,
    };
    if (searchTerm && searchTerm !== '') {
      query.query = {
        query_string: {
          query: `${searchTerm}`
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
    let motionUrl = `${(environment.backendUrl)}motions/`;
    return `${motionUrl}${motionId}`;
  }

  private mapSingleBackendMotion(bm: MotionGroup | null): Page<MotionGroup> {
    let values: MotionGroup[] = [];
    if (bm !== null) values = [bm];
    return {
      pageNr: 1,
      pageSize: 1,
      totalPages: 1,
      values: values,
    };
  }
}
