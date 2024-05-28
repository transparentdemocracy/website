import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { Page } from './pages';
import { MotionGroup } from './motions';

@Injectable({
  providedIn: 'root',
})
export class MotionsHttpService {
  private readonly url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getMotions(page: number, searchTerm: string): Observable<Page<MotionGroup>> {
    return this.fetchBackendMotions(page, searchTerm);
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

  private fetchBackendMotions(
    page: number,
    searchTerm: string | null
  ): Observable<Page<MotionGroup>> {
    let completeUrl = this.buildUrl(searchTerm, page);
    return this.http.get<Page<MotionGroup>>(completeUrl);
  }

  private buildUrl(searchTerm: string | null, page: number) {
    let motionUrl = `${this.url}motions/`;
    let searchTermPart =
      searchTerm == null || searchTerm == `` ? `` : `search=${searchTerm}&`;
    let pagePart = `page=${page}&size=10`;
    return `${motionUrl}?${searchTermPart}${pagePart}`;
  }

  private buildUrlById(motionId: string) {
    let motionUrl = `${this.url}motions/`;
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
