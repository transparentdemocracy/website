import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MotionsHttpService {
  private readonly url = 'http://localhost:8080/motions/';

  constructor(private http: HttpClient) {}

  getMotions(): Observable<Motion[]> {
    return this.fetchBackendMotions().pipe(
      map((backendArray: BackendMotion[]) =>
        backendArray.map((bm: BackendMotion) => new ActualMotion(bm))
      )
    );
  }

  findMotions(searchTerm: string): Observable<Motion[]> {
    return this.findBackendMotion(searchTerm).pipe(
      map((backendArray: BackendMotion[]) =>
        backendArray.map((bm: BackendMotion) => new ActualMotion(bm))
      )
    );
  }

  private fetchBackendMotions(): Observable<BackendMotion[]> {
    return this.http.get<BackendMotion[]>(this.url).pipe(
      map((motions: BackendMotion[]) => {
        //TODO improve returning array with one element of list
        return motions;
      })
    );
  }

  private findBackendMotion(motionId: string): Observable<BackendMotion[]> {
    return this.http.get<BackendMotion[]>(this.url + `${motionId}`);
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

interface BackendMotion {
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

export const EMPTY_MOTION: Motion = {
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
