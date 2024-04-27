import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class MotionsHttpService {
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

  constructor(private http: HttpClient) {}

  getMotions(): Observable<Motion[]> {
    return of(this.motions);
    // return this.http.get<Motions>('url').pipe(
    //   map((motions: Motions) => motions.motions)
    // );
  }

  getMotion(motionId: string): Observable<Motion> {
    const parsedMotionId = parseInt(motionId, 10);
    const motion = this.motions.find(
      (motion) => motion.proposal.id === parsedMotionId
    );
    if (!motion) {
      console.error('Motion not found');
      return of(EMPTY_MOTION);
    } else {
      return of(motion);
    }
    
    // return this.http.get<Motion>(`url/${motionId}`);
  }
}

export interface Motions {
  motions: Motion[];
}

export interface Motion {
  proposal: Proposal;
}

export interface Proposal {
  id: number;
  description: string;
}

export const EMPTY_MOTION: Motion = {
  proposal: {
    id: 0,
    description: 'No motion found'
  }
}