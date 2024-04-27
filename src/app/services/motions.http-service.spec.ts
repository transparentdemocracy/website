import { TestBed } from '@angular/core/testing';
import { MotionsHttpService } from './motions.http-service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MotionsHttpService', () => {
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
      expect(motion.proposal.id).toBe(1);
      expect(motion.proposal.description).toBe('First proposal');
      done();
    });
  });

  it('should return EMPTY_MOTION when seraching for unexisting motion', (done) => {
    service.getMotion('4').subscribe((motion) => {
      expect(motion.proposal.id).toBe(0);
      expect(motion.proposal.description).toBe('No motion found');
      done();
    });
  });
});
