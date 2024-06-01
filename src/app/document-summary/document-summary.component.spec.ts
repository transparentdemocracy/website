import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DocumentSummaryComponent } from './document-summary.component';

describe('DocumentSummaryComponent', () => {
  let component: DocumentSummaryComponent;
  let fixture: ComponentFixture<DocumentSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentSummaryComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
