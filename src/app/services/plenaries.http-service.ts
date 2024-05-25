import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Page} from "./pages";

@Injectable({
  providedIn: 'root',
})
export class PlenariesHttpService {
  private readonly url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  getPlenaries(page: number, searchTerm: string): Observable<Page<Plenary>> {
    return this.fetchPlenaries(page, searchTerm);
  }

  private fetchPlenaries(
    page: number, searchTerm: string | null
  ): Observable<Page<Plenary>> {
    let completeUrl = this.buildUrl(searchTerm, page);
    return this.http.get<Page<Plenary>>(completeUrl);
  }

  private buildUrl(searchTerm: string | null, page: number) {
    let motionUrl = `${this.url}plenaries/`;
    let searchTermPart = (searchTerm == null || searchTerm == ``) ? `` : `search=${searchTerm}&`;
    let pagePart = `page=${page}&size=10`;
    return `${motionUrl}?${searchTermPart}${pagePart}`;
  }
}

export interface Plenary {
  id: string
  legislature: string
  date: string
  pdfReportUrl: string
  htmlReportUrl: string
  motions: MotionLink[];
}

export interface MotionLink {
  motionId: string,
  titleNL: String,
  titleFR: String
}

