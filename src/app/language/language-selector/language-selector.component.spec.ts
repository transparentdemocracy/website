import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSelector } from './language-selector.component';
import {testTranslateModule} from "../../services/test-translation-module";

describe('LanguageSelectorComponent', () => {
  let component: LanguageSelector;
  let fixture: ComponentFixture<LanguageSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [testTranslateModule, LanguageSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(LanguageSelector);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
