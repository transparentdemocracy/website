import { ComponentFixture, TestBed } from '@angular/core/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import { SearchBarComponent } from './search-bar.component';
import {RouterModule} from "@angular/router";

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent, TranslateModule.forRoot(), RouterModule.forRoot([])],
      providers: [TranslateService]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
