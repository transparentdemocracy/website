import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentSummaryComponent } from './document-summary.component';

describe('DocumentSummaryComponent', () => {
  let component: DocumentSummaryComponent;
  let fixture: ComponentFixture<DocumentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DocumentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
