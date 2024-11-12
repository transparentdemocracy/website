import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MotionGroupsDisplayComponent} from './motion-groups-display.component';

describe('MotionGroupDisplayComponent', () => {
  let component: MotionGroupsDisplayComponent;
  let fixture: ComponentFixture<MotionGroupsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotionGroupsDisplayComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MotionGroupsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
