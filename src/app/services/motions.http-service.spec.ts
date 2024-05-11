import { TestBed } from '@angular/core/testing';
import { EMPTY_MOTION, MotionsHttpService } from './motions.http-service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

const MOTION = {
  title: '1',
  description: 'first proposal',
  votingDate: '2024-05-07',
  votingResult: true,
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
      service.getMotions().subscribe((motions) => {
        // then
        expect(motions.length).toBe(3);
        done();
      });

      const req = httpTestingController.expectOne(
        'http://localhost:8080/motions/'
      );

      // when
      req.flush([MOTION, MOTION, MOTION]);
      httpTestingController.verify();
    });
  });

  describe('#getMotion', () => {
    it('should return observable of 1 motion', (done) => {
      // given
      service.getMotion('1').subscribe((motion) => {
        // then
        expect(motion.title).toBe('1');
        expect(motion.description).toBe('first proposal');
        done();
      });

      const req = httpTestingController.expectOne(
        'http://localhost:8080/motions/1'
      );

      // when
      req.flush(MOTION);
      httpTestingController.verify();
    });

    it('should return an observable with EMPTY_MOTION when searching for unexisting motion', (done) => {
      // given
      service.getMotion('4').subscribe((motion) => {
        // then
        expect(motion.title).toBe('N/A');
        expect(motion.description).toBe('N/A');
        done();
      });

      const req = httpTestingController.expectOne(
        'http://localhost:8080/motions/4'
      );

      // when
      req.flush(EMPTY_MOTION);
      httpTestingController.verify();
    });
  });
});
