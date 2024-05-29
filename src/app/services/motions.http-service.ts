import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs';
import {Page} from './pages';
import {MotionGroup} from './motions';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class MotionsHttpService {


  constructor(private http: HttpClient) {
  }

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
