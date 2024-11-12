import {TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from "@angular/router";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot(), RouterModule.forRoot([])],
    })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
