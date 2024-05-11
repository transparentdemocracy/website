import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {of} from "rxjs/internal/observable/of";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class MotionsHttpService {
  private readonly url = 'http://localhost:8080/motions/';

  constructor(private http: HttpClient) {
  }

  getMotions(): Observable<Motion[]> {
    console.log("get motions called")
    // Hardcoded motions
    // return this.hardCodedMotions();

    // Actual http call
    return this.fetchBackendMotions().pipe(
      map((backendArray: BackendMotion[]) => backendArray.map((bm: BackendMotion) => new ActualMotion(bm)))
    );
    
  }


  private fetchBackendMotions(): Observable<BackendMotion[]> {
    return this.http.get<BackendMotion[]>(this.url).pipe(
      map((motions: BackendMotion[]) => {
          //TODO improve returning array with one element of list
          return motions;
        }
      )
    );
  }

  private hardCodedMotions() {
    return of(DummyData.motions);
  }

  getMotion(motionId: string): Observable<Motion> {
    //Actual http call
    return this.fetchBackendMotion(motionId)
      .pipe(map((x: BackendMotion) => {
        // TODO: depending on how the backend handles non-existing motions, this might need to be adjusted
        if (!x) {
          return EMPTY_MOTION;
        } else {
          return new ActualMotion(x);
        }
      }));

    //Hardcoded motions
    // return this.hardCodedMotion(motionId);
  }

  private fetchBackendMotion(motionId: string) {
    return this.http.get<BackendMotion>(this.url + `${motionId}`);
  }

  private hardCodedMotion(motionId: string) {
    const motion = DummyData.motions.find(
      (motion) => motion.title === motionId
    );
    if (!motion) {
      console.error('Motion not found');
      return of(EMPTY_MOTION);
    } else {
      return of(motion);
    }
  }
}

export interface Motion {
  title: string;
  description: string;
  votingDate: string;
  votingResult: boolean;
  /**
   * This view field should not come back from the service?
   */
  isExpanded: boolean;
}

class ActualMotion {

  constructor(backend: BackendMotion) {
    this.title = backend.title;
    this.description = backend.description;
    this.votingDate = backend.votingDate;
    this.votingResult = backend.votingResult;
    this.isExpanded = false;
  }

  title: string;
  description: string;
  votingDate: string;
  votingResult: boolean;
  isExpanded: boolean;
}

interface BackendMotion {
  description: string;
  title: string;
  votingDate: string;
  votingResult: boolean;
}

export const EMPTY_MOTION: Motion = {
  description: "N/A",
  title: "N/A",
  votingDate: "N/A",
  votingResult: false,
  isExpanded: false,
}

namespace DummyData {
  export const motions = [
    {
      title: "1",
      description: "first proposal",
      votingDate: "2024-05-07",
      votingResult: true,
      isExpanded: false
    },
    {
      title: "2",
      description: "second proposal",
      votingDate: "2024-04-07",
      votingResult: true,
      isExpanded: false
    },
    {
      title: "3",
      description: "third proposal",
      votingDate: "2023-05-07",
      votingResult: true,
      isExpanded: false
    },
  ];

}
