import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMotionsComponent } from './new-motions.component';

describe('NewMotionsComponent', () => {
  let component: NewMotionsComponent;
  let fixture: ComponentFixture<NewMotionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMotionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMotionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
