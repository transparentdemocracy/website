import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { Page } from './pages';
import { dateConversion } from './date-service';

@Injectable({
  providedIn: 'root',
})
export class MotionsHttpService {
  private readonly url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getMotions(page: number, searchTerm: string): Observable<Page<Motion>> {
    return this.fetchBackendMotions(page, searchTerm).pipe(
      map((backendPage: Page<BackendMotion>) => {
        return this.mapMotionPage(backendPage);
      })
    );
  }

  getMotion(motionId: string): Observable<Page<Motion>> {
    let completeUrl = this.buildUrlById(motionId);
    return this.fetchById(completeUrl).pipe(
      map((backendPage: BackendMotion | null) => {
        return this.mapSingleBackendMotion(backendPage);
      })
    );
  }

  private fetchById(completeUrl: string): Observable<BackendMotion | null> {
    return this.http.get<BackendMotion>(completeUrl);
  }

  private fetchBackendMotions(
    page: number,
    searchTerm: string | null
  ): Observable<Page<BackendMotion>> {
    let completeUrl = this.buildUrl(searchTerm, page);
    return this.http.get<Page<BackendMotion>>(completeUrl);
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

  private mapMotionPage(backendPage: Page<BackendMotion>): Page<Motion> {
    let actualMotions = backendPage.values.map(
      (bm: BackendMotion) => new ActualMotion(bm)
    );
    return this.createPageMotion(backendPage, actualMotions);
  }

  private createPageMotion(
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

  private mapSingleBackendMotion(bm: BackendMotion | null): Page<Motion> {
    let values: ActualMotion[] = [];
    if (bm !== null) values = [new ActualMotion(bm)];
    return {
      pageNr: 1,
      pageSize: 1,
      totalPages: 1,
      values: values,
    };
  }
}

export interface Motion {
  id: string;
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
  partyVotes: PartyVotes[];
}

export interface PartyVotes {
  partyName: string;
  votePercentage: number;
  numberOfVotes: number;
}

class ActualMotion implements Motion {
  constructor(backend: BackendMotion) {
    this.id = backend.id;
    this.titleNL = backend.titleNL;
    this.titleFR = backend.titleFR;
    this.descriptionNL = backend.descriptionNL;
    this.descriptionFR = backend.descriptionFR;
    this.votingDate = backend.votingDate;
    this.votingDate = dateConversion(backend.votingDate);
    this.votingResult = backend.votingResult;
    this.yesVotes = backend.yesVotes;
    this.noVotes = backend.noVotes;
    this.absVotes = backend.absVotes;
  }

  id: string;
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
  id: string;
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
