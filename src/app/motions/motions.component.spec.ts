import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MotionsComponent } from './motions.component';
import { Motion, MotionsHttpService, Pagination } from '../services/motions.http-service';
import { of } from 'rxjs/internal/observable/of';

const FIRST_PROPOSAL: Motion = {
  titleNL: 'FIRST_PROPOSAL',
  titleFR: 'FIRST_PROPOSAL',
  votingDate: '14/02/2024',
  votingResult: true,
  descriptionNL: 'First proposal',
  descriptionFR: 'First proposal',
  nrOfNoVotes: 2,
  nrOfAbsentVotes: 4,
  nrOfYesVotes: 5,
};
const SECOND_PROPOSAL: Motion = {
  titleNL: 'SECOND_PROPOSAL',
  titleFR: 'SECOND',
  votingDate: '14/02/2024',
  votingResult: true,
  descriptionNL: 'Second proposal',
  descriptionFR: 'Second proposal',
  nrOfNoVotes: 2,
  nrOfAbsentVotes: 4,
  nrOfYesVotes: 5,
};
const PAGED_MOTIONS: Pagination<Motion> = {
  values: [FIRST_PROPOSAL, SECOND_PROPOSAL],
  totalPages: 1,
  pageNr: 1,
  pageSize: 5,
};
  
describe('MotionsComponent', () => {
  let component: MotionsComponent;
  let fixture: ComponentFixture<MotionsComponent>;
  let motionsHttpServiceMock = jasmine.createSpyObj('MotionsHttpService', [
    'getMotions',
    'findMotions',
  ]);
  motionsHttpServiceMock.getMotions.and.returnValue(of(PAGED_MOTIONS));
  motionsHttpServiceMock.findMotions.and.returnValue(of([FIRST_PROPOSAL]));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotionsComponent],
      providers: [
        { provide: MotionsHttpService, useValue: motionsHttpServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MotionsComponent);
    component = fixture.componentInstance;

    motionsHttpServiceMock.getMotions.calls.reset();
    motionsHttpServiceMock.findMotions.calls.reset();

    expect(motionsHttpServiceMock.getMotions).not.toHaveBeenCalled();
    expect(motionsHttpServiceMock.findMotions).not.toHaveBeenCalled();
  });

  describe('#getPagedMotions', () => {
    it('gets paged motions', (done) => {
      // given

      // when
      component.getPagedMotions(1);

      // then
      component.motions$$.subscribe((motions: Motion[]) => {
        expect(motionsHttpServiceMock.getMotions).toHaveBeenCalled();
        expect(motions[0].titleNL).toEqual(FIRST_PROPOSAL.titleNL);
        expect(motions[1].titleNL).toEqual(SECOND_PROPOSAL.titleNL);
        done();
      });
    });
  });

  describe('#searchMotions', () => {
    it('searches for motions that answer the search query', (done) => {
      // given

      // when
      component.searchMotions('1');

      // then
      component.motions$$.subscribe((motions: Motion[]) => {
        expect(motionsHttpServiceMock.findMotions).toHaveBeenCalled();
        expect(motions[0].titleNL).toEqual(FIRST_PROPOSAL.titleNL);
        done();
      });
    });
  });
});
