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

    observable.forEach((x) => console.log(x)).then(r => console.log("Then ?"))
    console.log(observable)
    return observable;
  }

  getMotion(motionId: string): Observable<Motion> {
    return this.http.get<Motion>(this.url + `${motionId}`);
  }
}


export interface Motion {
  proposal: Proposal;
  isExpanded: boolean;
}

export interface Proposal {
  id: number;
  description: string;
}

export const EMPTY_MOTION: Motion = {
  isExpanded: false,
  proposal: {
    id: 0,
    description: 'No motion found'
  }
}
