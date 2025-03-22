import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentUserCardComponent } from './current-user-card.component';

describe('CurrentUserCardComponent', () => {
  let component: CurrentUserCardComponent;
  let fixture: ComponentFixture<CurrentUserCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentUserCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentUserCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
