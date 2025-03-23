import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CurrentUserCardComponent} from './current-user-card.component';
import {AuthService} from "../auth.service";
import {EMPTY} from "rxjs";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {testTranslateModule} from "../services/test-translation-module";

describe('CurrentUserCardComponent', () => {
  let component: CurrentUserCardComponent;
  let fixture: ComponentFixture<CurrentUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentUserCardComponent, TranslateModule.forRoot(), testTranslateModule],
      providers: [
        TranslateService,
        {provide: AuthService, useValue: {authState$: EMPTY}}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CurrentUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })
  ;

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
