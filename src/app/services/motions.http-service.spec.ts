import { TestBed } from '@angular/core/testing';
import {
  BackendMotion,
  Motion,
  MotionsHttpService,
  Pagination,
} from './motions.http-service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

const MOTION: BackendMotion = {
  titleNL: '1',
  titleFR: '1',
  descriptionNL: 'first proposal',
  descriptionFR: 'first proposal',
  votingDate: '2024-05-07',
  votingResult: true,
  nrOfYesVotes: 2,
  nrOfNoVotes: 3,
  nrOfAbsentVotes: 4,
};

describe('MotionsHttpService', () => {
  let service: MotionsHttpService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MotionsHttpService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('#getMotions', () => {
    it('should return observable of motions', (done) => {
      // given
      const PAGED_MOTIONS = {
        pageNr: 1,
        pageSize: 5,
        totalPages: 1,
        values: [MOTION, MOTION, MOTION],
      };

      service.getMotions(1).subscribe((motions: Pagination<Motion>) => {
        // then
        expect(motions.pageNr).toBe(1);
        expect(motions.values.length).toBe(3);
        done();
      });

      const req = httpTestingController.expectOne(
        'http://localhost:8080/motions/?page=1&size=5'
      );

      // when
      req.flush(PAGED_MOTIONS);
      httpTestingController.verify();
    });
  });

  describe('#findMotions', () => {
    it('should return observable of 1 motion', (done) => {
      // given
      service.findMotions('1').subscribe((motion) => {
        // then
        expect(motion.length).toBe(1);
        let singleMotion = motion.pop();
        expect(singleMotion?.titleNL).toBe('1');
        expect(singleMotion?.descriptionNL).toBe('first proposal');
        done();
      });

      const req = httpTestingController.expectOne(
        'http://localhost:8080/motions/1'
      );

      // when
      req.flush([MOTION]);
      httpTestingController.verify();
    });

    it('should return an observable with EMPTY_MOTION when searching for unexisting motion', (done) => {
      // given
      service.findMotions('none').subscribe((motion) => {
        // then
        expect(motion.length).toBe(0);
        done();
      });

      const req = httpTestingController.expectOne(
        'http://localhost:8080/motions/none'
      );

      // when
      req.flush([]);
      httpTestingController.verify();
    });
  });
});
