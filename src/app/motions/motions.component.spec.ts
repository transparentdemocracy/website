import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MotionsComponent} from './motions.component';
import {MotionsHttpService} from '../services/motions.http-service';
import {of} from 'rxjs/internal/observable/of';
import {Motion, MotionGroup} from "../services/motions";
import {Page} from "../services/pages";
import {RouterModule} from "@angular/router";
import {TranslateModule, TranslateService} from "@ngx-translate/core";


const FIRST_PROPOSAL: Motion = {
  id: 'first',
  titleNL: 'FIRST_PROPOSAL',
  titleFR: 'FIRST_PROPOSAL',
  votingDate: '14/02/2024',
  votingResult: true,
  noVotes: {
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
  yesVotes: {
    nrOfVotes: 1,
    votePercentage: 30,
    partyVotes: [
      {
        partyName: 'CD&V',
        numberOfVotes: 1,
        votePercentage: 35,
      },
    ],
  },
};
const SECOND_PROPOSAL: Motion = {
  id: 'second',
  titleNL: 'SECOND_PROPOSAL',
  titleFR: 'SECOND',
  votingDate: '14/02/2024',
  votingResult: true,
  noVotes: {
    nrOfVotes: 2,
    votePercentage: 30,
    partyVotes: [
      {
        partyName: 'CD&V',
        numberOfVotes: 2,
        votePercentage: 35,
      },
    ]
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
    ]
  },
  yesVotes: {
    nrOfVotes: 5,
    votePercentage: 30,
    partyVotes: [
      {
        partyName: 'CD&V',
        numberOfVotes: 5,
        votePercentage: 35,
      },
    ]
  },
};

const MOTION_GROUP: MotionGroup = {
  id: 'test',
  titleNL: 'First motion group nl',
  titleFR: 'First motion group fr',
  votingDate: '2024-10-13',
  motions: [FIRST_PROPOSAL, SECOND_PROPOSAL],
};

const PAGED_MOTIONS: Page<MotionGroup> = {
  values: [MOTION_GROUP],
  totalPages: 1,
  pageNr: 1,
  pageSize: 5,
};

describe('MotionsComponent', () => {
  let component: MotionsComponent;
  let fixture: ComponentFixture<MotionsComponent>;
  let motionsHttpServiceMock = jasmine.createSpyObj('MotionsHttpService', [
    'getMotions',
  ]);
  motionsHttpServiceMock.getMotions.and.callFake(() => of(PAGED_MOTIONS));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotionsComponent, RouterModule.forRoot([]), TranslateModule.forRoot()],
      providers: [
        {provide: MotionsHttpService, useValue: motionsHttpServiceMock},
        TranslateService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MotionsComponent);
    component = fixture.componentInstance;

    motionsHttpServiceMock.getMotions.calls.reset();

    expect(motionsHttpServiceMock.getMotions).not.toHaveBeenCalled();
  });

  describe('#getPagedMotions', () => {
    it('gets paged motions', (done) => {
      // when
      component.getPagedMotions(1);

      // then
      expect(motionsHttpServiceMock.getMotions).toHaveBeenCalled();

      component.motionsGroups$$.subscribe((motions) => {
        expect(motions[0].titleNL).toEqual(MOTION_GROUP.titleNL);
        done();
      });
    });
  });

  describe('#searchMotions', () => {
    it('searches for motions that answer the search query', (done) => {
      // given

      // when
      component.searchMotions('blah');

      // then
      component.motionsGroups$$.subscribe((motion) => {
        expect(motionsHttpServiceMock.getMotions).toHaveBeenCalled();
        expect(motion[0].titleNL).toEqual(MOTION_GROUP.titleNL);
        done();
      });
    });
  });
});

