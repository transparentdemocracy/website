import { HttpClient, HttpParams } from '@angular/common/http';
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

  getMotions(page: number, searchTerm: string, minDate?: string, maxDate?: string): Observable<Page<MotionGroup>> {
    return this.fetchMotions(page, searchTerm, minDate, maxDate);
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

  /* page is 1-based */
  private fetchMotions(
    page: number,
    searchTerm: string | null,
    minDate?: string,
    maxDate?: string,
  ): Observable<Page<MotionGroup>> {
    const PAGE_SIZE = 10;
    let params = new HttpParams()
      .set("q", searchTerm || "")
      .set("page", page - 1)

      if (minDate) {
        params = params.set("minDate", minDate)
      }
      if (maxDate) {
        params = params.set("maxDate", maxDate)
      }
    return this.http.get<ElasticSearch<MotionGroup>>(`${environment.searchMotionsUrl}?`, {
      params: params
    })
      .pipe(map(v => ({
            pageNr: page,
            pageSize: PAGE_SIZE,
            totalPages: Math.ceil(v.hits.total.value / PAGE_SIZE),
            values: v.hits.hits.map(it => it._source)
          })
        )
      )
  }


  private buildUrlById(motionId: string) {
    return `${(environment.getMotionUrl)}${motionId}`;
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
