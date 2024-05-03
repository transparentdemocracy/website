import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class MotionsHttpService {
  private readonly url = 'http://localhost:8080/motions/';

  private motions = [
    {
      proposal: {
        id: 1,
        description: 'First proposal',
      },
    },
    {
      proposal: {
        id: 2,
        description: 'Second proposal',
      },
    },
    {
      proposal: {
        id: 3,
        description: 'Third proposal',
      },
    },
  ];

  constructor(private http: HttpClient) {
  }

  getMotions(): Observable<Motion[]> {
    console.log("get motions called")

    let observable = this.http.get<Motion[]>(this.url).pipe(
      map((motions: Motion[]) => {
          console.log(motions);
          return motions;
        }
      )
    );

    return observable;
  }

  getMotion(motionId: string): Observable<Motion> {
    return this.http.get<Motion>(this.url + `${motionId}`);
  }
}

export interface Motion {
  title: string;
  description: string;
  votingDate: string;
  votingResult: boolean;
  isExpanded: boolean;
}

export const EMPTY_MOTION: Motion = {
  description: "N/A",
  title: "N/A",
  votingDate: "N/A",
  votingResult: false,
  isExpanded: false,
}
