import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPaginationComponent } from './new-pagination.component';

describe('NewPaginationComponent', () => {
  let component: NewPaginationComponent;
  let fixture: ComponentFixture<NewPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
