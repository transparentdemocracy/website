import {HttpClient} from '@angular/common/http';
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
    return this.fetchPlenariesFromElastic(page, searchTerm);
  }

  private fetchPlenariesFromElastic(
    page: number, searchText: string | null
  ): Observable<Page<Plenary>> {
    const PAGE_SIZE = 10;
    var query = this.createSearchQuery(PAGE_SIZE, page, searchText)
    return this.http.post<ElasticSearch<Plenary>>(`${environment.elasticUrl}plenaries/_search`, query)
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

  private createSearchQuery(pageSize: number, page: number, searchText: string | null) {
    let query: any = {
      size: pageSize,
      from: (page-1) * pageSize,
      sort: [{date: "desc"}]
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


