import {TestBed} from '@angular/core/testing';
import {MotionsHttpService} from './motions.http-service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

/**
 * test fails when actual http call is done
 */
xdescribe('MotionsHttpService', () => {
  let service: MotionsHttpService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(MotionsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get motions', (done) => {
    service.getMotions().subscribe((motions) => {
      expect(motions.length).toBe(3);
      done();
    });
  });

  it('should get motion', (done) => {
    service.getMotion('1').subscribe((motion) => {
      expect(motion.title).toBe("1");
      expect(motion.description).toBe('first proposal');
      done();
    });
  });

  it('should return EMPTY_MOTION when searching for unexisting motion', (done) => {
    service.getMotion('4').subscribe((motion) => {
      expect(motion.title).toBe("N/A");
      expect(motion.description).toBe('N/A');
      done();
    });
  });
});
