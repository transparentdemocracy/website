import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MotionsComponent} from './motions.component';
import {ActivatedRoute, provideRouter} from "@angular/router";
import {Subject} from "rxjs";
import {MotionsHttpService} from "../services/motions.http-service";
import {TranslateModule} from "@ngx-translate/core";
import {of} from "rxjs/internal/observable/of";
import {Motion, MotionGroup} from "../services/motions";
import {Page} from "../services/pages";
import {By} from "@angular/platform-browser";
import {provideLocationMocks} from "@angular/common/testing";
import {Location} from "@angular/common";

describe('NewMotionsComponent', () => {
  let component: MotionsComponent;
  let fixture: ComponentFixture<MotionsComponent>;
  let paramsSubject: Subject<any>;
  let queryParamsSubject: Subject<any>;

  let motionsHttpServiceMock = jasmine.createSpyObj('MotionsHttpService', [
    'getMotions',
  ]);

  motionsHttpServiceMock.getMotions.and.callFake(() => of(PAGED_MOTIONS))

  beforeEach(async () => {

    // Create subjects to control params and queryParams
    paramsSubject = new Subject<any>();
    queryParamsSubject = new Subject<any>();

    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [
        {provide: MotionsHttpService, useValue: motionsHttpServiceMock},
        provideRouter([]),
        provideLocationMocks(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: paramsSubject.asObservable(),
            queryParams: queryParamsSubject.asObservable()
          }
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    motionsHttpServiceMock.getMotions.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('search scenarios', () => {
    it('shows value of search string', async () => {
      paramsSubject.next({})
      queryParamsSubject.next({q: 'klimaat', page: 5})

      fixture.detectChanges();
      await fixture.whenStable();

      expect(fixture.debugElement.query(By.css('#searchInput')).nativeElement.value).toBe('klimaat')
    })

    it('loads motions from http service', async () => {
      paramsSubject.next({})
      queryParamsSubject.next({q: 'klimaat', page: 5})

      fixture.detectChanges();
      await fixture.whenStable();

      expect(motionsHttpServiceMock.getMotions).toHaveBeenCalledTimes(1)
      expect(motionsHttpServiceMock.getMotions).toHaveBeenCalledWith(5, 'klimaat')
    })

    it('pagination shows all 5 pages', async () => {
      paramsSubject.next({})
      queryParamsSubject.next({q: 'klimaat', page: 5})

      fixture.detectChanges();
      await fixture.whenStable();

      let pageItems = fixture.debugElement.queryAll(By.css('.page-item'));
      expect(pageItems.length).toBe(7) // 5 pages + prev/next buttons
      expect(pageItems[1].nativeElement.textContent).toContain('1')
      expect(pageItems[2].nativeElement.textContent).toContain('2')
      expect(pageItems[3].nativeElement.textContent).toContain('3')
      expect(pageItems[4].nativeElement.textContent).toContain('4')
      expect(pageItems[5].nativeElement.textContent).toContain('5')
    })

    it('clicking previous button triggers navigation', async () => {
      paramsSubject.next({})
      queryParamsSubject.next({q: 'klimaat', page: 5})

      fixture.detectChanges();
      await fixture.whenStable();

      fixture.debugElement.query(By.css('.page-item button')).nativeElement.click()

      fixture.detectChanges();
      await fixture.whenStable();

      const location = TestBed.inject(Location)
      expect(location.path()).toEqual('/?q=klimaat&page=4')
    })
  })
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
  totalPages: 5,
  pageNr: 5,
  pageSize: 5,
};
