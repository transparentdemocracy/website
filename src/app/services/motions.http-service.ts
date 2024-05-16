import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MotionsHttpService {
  private readonly url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {
  }

  getMotions(page: number, searchTerm: string): Observable<Page<Motion>> {
    return this.fetchBackendMotions(page, searchTerm).pipe(
      this.mapBackendMotionPage()
    );
  }

  private fetchBackendMotions(
    page: number, searchTerm: string | null
  ): Observable<Page<BackendMotion>> {
    let completeUrl = this.buildUrl(searchTerm, page);
    return this.http.get<Page<BackendMotion>>(completeUrl);
  }

  private buildUrl(searchTerm: string | null, page: number) {
    let motionUrl = `${this.url}motions/`;
    let searchTermPart = (searchTerm == null || searchTerm == ``) ? `` : `search=${searchTerm}&`;
    let pagePart = `page=${page}&size=5`;
    return `${motionUrl}?${searchTermPart}${pagePart}`;
  }

  private mapBackendMotionPage() {
    return map((backendPage: Page<BackendMotion>) => {
      let actualMotions = backendPage.values.map(
        (bm: BackendMotion) => new ActualMotion(bm)
      );
      return this.createMotionPage(backendPage, actualMotions);
    });
  }

  private createMotionPage(
    pagination: Page<BackendMotion>,
    actualMotions: ActualMotion[]
  ): Page<Motion> {
    return {
      pageNr: pagination.pageNr,
      pageSize: pagination.pageSize,
      totalPages: pagination.totalPages,
      values: actualMotions,
    };
  }
}

export interface Motion {
  titleNL: string;
  titleFR: string;
  descriptionNL: string;
  descriptionFR: string;
  votingDate: string;
  votingResult: boolean;
  yesVotes: Votes;
  noVotes: Votes;
  absVotes: Votes;
}

export interface Votes {
  nrOfVotes: number;
  partyVotes: PartyVotes[]
}

export interface PartyVotes {
  partyName: string;
  votePercentage: number;
  numberOfVotes: number;
}

export interface Page<T> {
  pageNr: number;
  pageSize: number;
  totalPages: number;
  values: T[];
}

class ActualMotion implements Motion {
  constructor(backend: BackendMotion) {
    this.titleNL = backend.titleNL;
    this.titleFR = backend.titleFR;
    this.descriptionNL = backend.descriptionNL;
    this.descriptionFR = backend.descriptionFR;
    this.votingDate = backend.votingDate;
    this.votingDate = backend.votingDate;
    this.votingResult = backend.votingResult;
    this.yesVotes =  backend.yesVotes
    this.noVotes = backend.noVotes
    this.absVotes = backend.absVotes
  }

  titleNL: string;
  titleFR: string;
  descriptionNL: string;
  descriptionFR: string;
  votingDate: string;
  votingResult: boolean;
  yesVotes: Votes;
  noVotes: Votes;
  absVotes: Votes;
}

interface BackendMotion {
  descriptionNL: string;
  descriptionFR: string;
  titleNL: string;
  titleFR: string;
  votingDate: string;
  votingResult: boolean;
  yesVotes: Votes;
  noVotes: Votes;
  absVotes: Votes;
}

