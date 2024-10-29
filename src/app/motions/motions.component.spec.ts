import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MotionsComponent} from './motions.component';
import {MotionsHttpService} from '../services/motions.http-service';
import {of} from 'rxjs/internal/observable/of';
import {Motion} from "../services/motions";
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
const PAGED_MOTIONS: Page<Motion> = {
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
  ]);
  motionsHttpServiceMock.getMotions.and.returnValue(of(PAGED_MOTIONS));

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
      // given

      // when
      component.getPagedMotions(1);

      // then
      component.motionsGroups$$.subscribe((motions) => {
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
      component.motionsGroups$$.subscribe((motion) => {
        expect(motionsHttpServiceMock.getMotions).toHaveBeenCalled();
        expect(motion[0].titleNL).toEqual(FIRST_PROPOSAL.titleNL);
        done();
      });
    });
  });
});

