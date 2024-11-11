import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewMotionsComponent} from './new-motions.component';
import {ActivatedRoute, RouterModule} from "@angular/router";
import {Subject} from "rxjs";
import {MotionsHttpService} from "../services/motions.http-service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {of} from "rxjs/internal/observable/of";
import {Motion, MotionGroup} from "../services/motions";
import {Page} from "../services/pages";
import {testTranslateModule} from "../services/test-translation-module";

describe('NewMotionsComponent', () => {
  let component: NewMotionsComponent;
  let fixture: ComponentFixture<NewMotionsComponent>;
  let paramsSubject: Subject<any>;
  let queryParamsSubject: Subject<any>;

  let motionsHttpServiceMock = jasmine.createSpyObj('MotionsHttpService', [
    'getMotions',
  ]);

  motionsHttpServiceMock.getMotions.and.callFake(() => of(PAGED_MOTIONS));

  beforeEach(async () => {
    // Create subjects to control params and queryParams
    paramsSubject = new Subject<any>();
    queryParamsSubject = new Subject<any>();

    await TestBed.configureTestingModule({
      imports: [NewMotionsComponent, RouterModule.forRoot([]), TranslateModule.forRoot()],
      providers: [
        {provide: MotionsHttpService, useValue: motionsHttpServiceMock},
        TranslateService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject.asObservable(),
            queryParams: queryParamsSubject.asObservable()
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NewMotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


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
  legislature: 55,
  plenaryNr: 123,
  titleNL: 'First motion group nl',
  titleFR: 'First motion group fr',
  votingDate: '2024-10-13',
  motions: [FIRST_PROPOSAL, SECOND_PROPOSAL]
};

const PAGED_MOTIONS: Page<MotionGroup> = {
  values: [MOTION_GROUP],
  totalPages: 1,
  pageNr: 1,
  pageSize: 5,
};
