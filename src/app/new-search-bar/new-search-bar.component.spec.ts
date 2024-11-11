import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSearchBarComponent } from './new-search-bar.component';

describe('NewSearchBarComponent', () => {
  let component: NewSearchBarComponent;
  let fixture: ComponentFixture<NewSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSearchBarComponent]
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
