import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSearchBarComponent } from './new-search-bar.component';
import {testTranslateModule} from "../services/test-translation-module";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

describe('NewSearchBarComponent', () => {
  let component: NewSearchBarComponent;
  let fixture: ComponentFixture<NewSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSearchBarComponent, TranslateModule.forRoot(), testTranslateModule],
      providers: [TranslateService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
