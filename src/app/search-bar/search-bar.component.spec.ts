import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import { SearchBarComponent } from './search-bar.component';
import {RouterModule} from "@angular/router";
import {testTranslateModule} from "../services/test-translation-module";
import {LanguageService} from "../services/language.service";

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, testTranslateModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
