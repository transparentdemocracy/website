import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MotionsComponent} from './motions.component';
import {Motion, MotionsHttpService} from '../services/motions.http-service';
import {of} from 'rxjs/internal/observable/of';

const FIRST_PROPOSAL: Motion = {
  titleNL: "FIRST_PROPOSAL",
  titleFR: "FIRST_PROPOSAL",
  votingDate: "14/02/2024",
  votingResult: true,
  descriptionNL: "First proposal",
  descriptionFR: "First proposal",
  nrOfNoVotes: 2,
  nrOfAbsentVotes: 4,
  nrOfYesVotes: 5
};
const SECOND_PROPOSAL: Motion = {
  titleNL: "SECOND_PROPOSAL",
  titleFR: "SECOND",
  votingDate: "14/02/2024",
  votingResult: true,
  descriptionNL: "Second proposal",
  descriptionFR: "Second proposal",
  nrOfNoVotes: 2,
  nrOfAbsentVotes: 4,
  nrOfYesVotes: 5
};
const MOTIONS = [FIRST_PROPOSAL, SECOND_PROPOSAL];

describe('MotionsComponent', () => {
  let component: MotionsComponent;
  let fixture: ComponentFixture<MotionsComponent>;
  let motionsHttpServiceMock = jasmine.createSpyObj('MotionsHttpService', ['getMotions', 'getMotion']);
  motionsHttpServiceMock.getMotions.and.returnValue(of(MOTIONS));
  motionsHttpServiceMock.getMotion.and.returnValue(of(FIRST_PROPOSAL));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotionsComponent],
      providers: [{provide: MotionsHttpService, useValue: motionsHttpServiceMock}],
    }).compileComponents();

    fixture = TestBed.createComponent(MotionsComponent);
    component = fixture.componentInstance;

    motionsHttpServiceMock.getMotions.calls.reset();
    motionsHttpServiceMock.getMotion.calls.reset();

    expect(motionsHttpServiceMock.getMotions).not.toHaveBeenCalled();
    expect(motionsHttpServiceMock.getMotion).not.toHaveBeenCalled();
  });

  describe('#ngOnInit', () => {
    it('gets all motions when the component is created', (done) => {
      // given

      // when
      fixture.detectChanges();

      // then
      component.motions$$.subscribe((motions: Motion[]) => {
        expect(motionsHttpServiceMock.getMotions).toHaveBeenCalled();
        expect(motions).toEqual(MOTIONS);
        done();
      });
    });
  });

  describe('#getPage', () => {
    it('gets a page of motions', (done) => {
      // given
      fixture.detectChanges();

      // when
      component.getMotionsPage(1);

      // then
      component.motions$$.subscribe((motions: Motion[]) => {
        expect(motionsHttpServiceMock.getMotions).toHaveBeenCalled();
        expect(motions).toEqual(MOTIONS);
        done();
      });
    });
  });

  describe('#getNewMotions', () => {
    it('gets a single motion', (done) => {
      // given
      fixture.detectChanges();

      // when
      component.getNewMotions('1');

      // then
      component.motions$$.subscribe((motions: Motion[]) => {
        expect(motionsHttpServiceMock.getMotion).toHaveBeenCalled();
        expect(motions[0]).toEqual(FIRST_PROPOSAL);
        done();
      });
    });
  });
});
