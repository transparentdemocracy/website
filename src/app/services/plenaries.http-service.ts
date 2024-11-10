import { HttpClient, HttpParams } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Page} from "./pages";
import {environment} from "../../environments/environment";
import {ElasticSearch} from "./elastic";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PlenariesHttpService {

  constructor(private http: HttpClient) {
  }

  getPlenaries(page: number, searchTerm: string): Observable<Page<Plenary>> {
    const PAGE_SIZE = 10;
    return this.http.get<ElasticSearch<Plenary>>(`${environment.searchPlenariesUrl}`, {
      params: new HttpParams().set("q", searchTerm || "").set("page", page - 1)
    })
      .pipe(
        map(v => ({
            pageNr: page,
            pageSize: PAGE_SIZE,
            totalPages: Math.ceil(v.hits.total.value / PAGE_SIZE),
            values: v.hits.hits.map(it => it._source),
          })
        )
      )
  }
}

export interface Plenary {
  id: string
  title: string
  legislature: string
  date: string
  pdfReportUrl: string
  htmlReportUrl: string
  motionGroups: MotionGroupLink[];
}


export interface MotionGroupLink {
  motionGroupId: string,
  titleNL: String,
  titleFR: String
  motionLinks: MotionLink[];
}

export interface MotionLink {
  motionId: string,
  agendaSeqNr: string,
  voteSeqNr: string,
  titleNL: String,
  titleFR: String
}


