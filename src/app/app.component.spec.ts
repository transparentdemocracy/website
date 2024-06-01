import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import {
  MotionsComponent,
  MotionsComponentMock,
} from './motions/motions.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    })
      .overrideComponent(AppComponent, {
        remove: { imports: [MotionsComponent] },
        add: { imports: [MotionsComponentMock] },
      })
      .compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
