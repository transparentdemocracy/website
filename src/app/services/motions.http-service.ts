import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MotionsHttpService {
  private readonly url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  getMotions(page: number): Observable<Pagination<Motion>> {
    return this.fetchBackendMotions(page).pipe(
      map((backendArray: Pagination<BackendMotion>) => {
        let actualMotions = backendArray.values.map(
          (bm: BackendMotion) => new ActualMotion(bm)
        );
        return this.extracted(backendArray, actualMotions);
      })
    );
  }

  private fetchBackendMotions(
    page: number
  ): Observable<Pagination<BackendMotion>> {
    return this.http.get<Pagination<BackendMotion>>(
      `${this.url}motions/?page=${page}&size=5`
    );
  }

  private extracted(
    pagination: Pagination<BackendMotion>,
    actualMotions: ActualMotion[]
  ) {
    const newPagination: Pagination<Motion> = {
      pageNr: pagination.pageNr,
      pageSize: pagination.pageSize,
      totalPages: pagination.totalPages,
      values: actualMotions,
    };
    return newPagination;
  }

  findMotions(searchTerm: string): Observable<Motion[]> {
    return this.findBackendMotion(searchTerm).pipe(
      map((backendArray: BackendMotion[]) =>
        backendArray.map((bm: BackendMotion) => new ActualMotion(bm))
      )
    );
  }

  private findBackendMotion(motionId: string): Observable<BackendMotion[]> {
    return this.http.get<BackendMotion[]>(this.url + `motions/${motionId}`);
  }
}

export interface Motion {
  titleNL: string;
  titleFR: string;
  descriptionNL: string;
  descriptionFR: string;
  votingDate: string;
  votingResult: boolean;
  nrOfYesVotes: number;
  nrOfNoVotes: number;
  nrOfAbsentVotes: number;
}

class ActualMotion {
  constructor(backend: BackendMotion) {
    this.titleNL = backend.titleNL;
    this.titleFR = backend.titleFR;
    this.descriptionNL = backend.descriptionNL;
    this.descriptionFR = backend.descriptionFR;
    this.votingDate = backend.votingDate;
    this.votingDate = backend.votingDate;
    this.votingResult = backend.votingResult;
    this.nrOfYesVotes = backend.nrOfYesVotes;
    this.nrOfNoVotes = backend.nrOfNoVotes;
    this.nrOfAbsentVotes = backend.nrOfAbsentVotes;
  }

  titleNL: string;
  titleFR: string;
  descriptionNL: string;
  descriptionFR: string;
  votingDate: string;
  votingResult: boolean;
  nrOfYesVotes: number;
  nrOfNoVotes: number;
  nrOfAbsentVotes: number;
}

export interface Pagination<T> {
  pageNr: number;
  pageSize: number;
  totalPages: number;
  values: T[];
}

export interface BackendMotion {
  descriptionNL: string;
  descriptionFR: string;
  titleNL: string;
  titleFR: string;
  votingDate: string;
  votingResult: boolean;
  nrOfYesVotes: number;
  nrOfNoVotes: number;
  nrOfAbsentVotes: number;
}

export const EMPTY_MOTION: BackendMotion = {
  nrOfAbsentVotes: 0,
  nrOfNoVotes: 0,
  nrOfYesVotes: 0,
  descriptionNL: 'N/A',
  descriptionFR: 'N/A',
  titleNL: 'N/A',
  titleFR: 'N/A',
  votingDate: 'N/A',
  votingResult: false,
};
