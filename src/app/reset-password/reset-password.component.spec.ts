import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ResetPasswordComponent} from './reset-password.component';
import {AuthService} from "../auth.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {testTranslateModule} from "../services/test-translation-module";

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResetPasswordComponent, TranslateModule.forRoot(), testTranslateModule],
      providers: [
        TranslateService,
        {provide: AuthService, useValue: jasmine.createSpyObj(['resetPassword'])},
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
