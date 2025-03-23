import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignupComponent} from './signup.component';
import {AuthService} from "../auth.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {testTranslateModule} from "../services/test-translation-module";

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent, TranslateModule.forRoot(), testTranslateModule],
      providers: [
        TranslateService,
        {provide: AuthService, useValue: jasmine.createSpyObj(['createUserWithEmailAndPassword'])}
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
