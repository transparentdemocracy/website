import {TestBed} from '@angular/core/testing';
import {Motion, MotionsHttpService, Page, PartyVotes, Votes,} from './motions.http-service';
import {HttpClientTestingModule, HttpTestingController,} from '@angular/common/http/testing';
import {HttpClient} from '@angular/common/http';

const MOTION = {
  titleNL: '1',
  titleFR: '1',
  descriptionNL: 'first proposal',
  descriptionFR: 'first proposal',
  votingDate: '2024-05-07',
  votingResult: true,
  yesVotes: new class implements Votes {
    nrOfVotes = 2
    partyVotes: PartyVotes[] = [
      {
        partyName: "CD&V",
        numberOfVotes: 2,
        votePercentage: 35
      }
    ]
  },
  noVotes: new class implements Votes {
    nrOfVotes = 3
    partyVotes: PartyVotes[] = [
      {
        partyName: "CD&V",
        numberOfVotes: 3,
        votePercentage: 35
      }
    ]
  },
  absVotes: new class implements Votes {
  nrOfVotes = 4
  partyVotes: PartyVotes[] = [
    {
      partyName: "CD&V",
      numberOfVotes: 4,
      votePercentage: 35
    }
  ]
},
};

const FIRST_PAGE_MOTIONS = {
  pageNr: 1,
  pageSize: 5,
  totalPages: 2,
  values: [MOTION, MOTION, MOTION, MOTION, MOTION],
};
const SECOND_PAGE_MOTIONS = {
  pageNr: 2,
  pageSize: 5,
  totalPages: 2,
  values: [MOTION, MOTION, MOTION],
};
const FIRST_PAGE_SEARCH_RESULT_MOTIONS = {
  pageNr: 1,
  pageSize: 5,
  totalPages: 1,
  values: [MOTION, MOTION],
};

const EMPTY_PAGE_SEARCH_RESULT_MOTIONS = {
  pageNr: 1,
  pageSize: 5,
  totalPages: 1,
  values: [],
};


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
          'http://localhost:8080/motions/?page=1&size=5'
        );

        // when
        req.flush(FIRST_PAGE_MOTIONS);
        httpMock.verify();

        //THEN
        function validateReturnedMotions() {
          return (motions: Page<Motion>) => {
            // then
            expect(motions.pageNr).toBe(1);
            expect(motions.values.length).toBe(5);
            done();
          };
        }
      }
    );

    it('should return second page of motions', (done) => {

        // given
        service.getMotions(2, "").subscribe(validateReturnedMotions());
        const req = httpMock.expectOne(
          'http://localhost:8080/motions/?page=2&size=5'
        );

        // when
        req.flush(SECOND_PAGE_MOTIONS);
        httpMock.verify();

        //THEN
        function validateReturnedMotions() {
          return (motions: Page<Motion>) => {
            // then
            expect(motions.pageNr).toBe(2);
            expect(motions.values.length).toBe(3);
            done();
          };
        }
      }
    );
  });


  describe('#findMotions', () => {
    it('should return one page of matching motions', (done) => {
      // given
      service.getMotions(1,'CoViD').subscribe(validateReturnedMotions());

      const req = httpMock.expectOne('http://localhost:8080/motions/?search=CoViD&page=1&size=5');

      // when
      req.flush(FIRST_PAGE_SEARCH_RESULT_MOTIONS);

      //THEN
      httpMock.verify();

      function validateReturnedMotions() {
        return (page: Page<Motion>) => {
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
        'http://localhost:8080/motions/?search=none&page=1&size=5'
      );

      // when
      req.flush(EMPTY_PAGE_SEARCH_RESULT_MOTIONS);

      //then
      httpMock.verify();
    });
  });
});
