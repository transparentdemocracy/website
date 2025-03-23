import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelector } from './language-selector.component';
import {testTranslateModule} from "../../services/test-translation-module";
import {TranslateModule} from "@ngx-translate/core";

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelector;
  let fixture: ComponentFixture<LanguageSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), testTranslateModule, LanguageSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
