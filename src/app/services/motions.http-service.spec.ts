import {TestBed} from '@angular/core/testing';
import {MotionsHttpService} from './motions.http-service';
import {HttpClientTestingModule, HttpTestingController,} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';
import {Motion, MotionGroup, PartyVotes, Votes} from "./motions";
import {Page} from "./pages";

describe('MotionsHttpService', () => {
  let service: MotionsHttpService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MotionsHttpService);
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('#getMotions', () => {
    it('should return first page of motions', (done) => {
      // given
      service.getMotions(1, ``).subscribe(validateReturnedMotions());
      const req = httpMock.expectOne(
        'http://localhost:9200/motions/_search'
      );

      // when
      req.flush(FIRST_PAGE_MOTIONS);
      httpMock.verify();

      //THEN
      function validateReturnedMotions() {
        return (motions: Page<MotionGroup>) => {
          // then
          expect(motions.pageNr).toBe(1);
          expect(motions.values.length).toBe(5);
          done();
        };
      }
    });

    it('should return second page of motions', (done) => {
      // given
      service.getMotions(2, '').subscribe(validateReturnedMotions());
      const req = httpMock.expectOne(
        'http://localhost:9200/motions/_search'
      );

      // when
      req.flush(SECOND_PAGE_MOTIONS);
      httpMock.verify();

      //THEN
      function validateReturnedMotions() {
        return (motions: Page<MotionGroup>) => {
          // then
          expect(motions.pageNr).toBe(2);
          expect(motions.values.length).toBe(3);
          done();
        };
      }
    });
  });

  describe('#findMotions', () => {
    it('should return one page of matching motions', (done) => {
      // given
      service.getMotions(1, 'CoViD').subscribe(validateReturnedMotions());

      const req = httpMock.expectOne(
        'http://localhost:9200/motions/_search'
      );

      // when
      req.flush(FIRST_PAGE_SEARCH_RESULT_MOTIONS);

      //THEN
      httpMock.verify();

      function validateReturnedMotions() {
        return (page: Page<MotionGroup>) => {
          expect(page.values.length).toBe(2);
          expect(page.pageNr).toBe(1);
          let singleMotion = page.values.pop();
          done();
        };
      }
    });

    it('should return an observable with EMPTY_MOTION when searching for unexisting motion', (done) => {
      // given
      service.getMotions(1, 'none').subscribe((motion) => {
        // then
        expect(motion.values.length).toBe(0);
        done();
      });

      const req = httpMock.expectOne(
        'http://localhost:9200/motions/_search'
      );

      // when
      req.flush(EMPTY_PAGE_SEARCH_RESULT_MOTIONS);

      //then
      httpMock.verify();
    });
  });
});

const MOTION = {
  titleNL: '1',
  titleFR: '1',
  descriptionNL: 'first proposal',
  descriptionFR: 'first proposal',
  votingDate: '2024-05-07',
  votingResult: true,
  yesVotes: {
    nrOfVotes: 2,
    votePercentage: 30,
    partyVotes: [
      {
        partyName: 'CD&V',
        numberOfVotes: 2,
        votePercentage: 35,
      },
    ],
  },
  noVotes: {
    nrOfVotes: 3,
    votePercentage: 30,
    partyVotes: [
      {
        partyName: 'CD&V',
        numberOfVotes: 3,
        votePercentage: 35,
      },
    ],
  },
  absVotes: {
    nrOfVotes: 4,
    votePercentage: 30,
    partyVotes: [
      {
        partyName: 'CD&V',
        numberOfVotes: 4,
        votePercentage: 35,
      },
    ],
  },
} as unknown as Motion; // TODO: check with Motion type

const FIRST_PAGE_MOTIONS = {
  hits: {
    total: {
      value: 10
    },
    hits: [hit(MOTION), hit(MOTION), hit(MOTION), hit(MOTION), hit(MOTION)]
  }
};
const SECOND_PAGE_MOTIONS = {
  hits: {
    total: {
      value: 13
    },
    hits: [hit(MOTION), hit(MOTION), hit(MOTION)]
  }
};
const FIRST_PAGE_SEARCH_RESULT_MOTIONS = {
  hits: {
    total: {
      value: 0
    },
    hits: [hit(MOTION), hit(MOTION)]
  }
};

const EMPTY_PAGE_SEARCH_RESULT_MOTIONS = {
  hits: {
    total: {
      value: 0
    },
    hits: []
  }
};

function hit(motion: Motion) {
  return {
    _source: motion
  };
}
