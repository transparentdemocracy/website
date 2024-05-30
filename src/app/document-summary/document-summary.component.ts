import {Component, Input} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'document-summary',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule
  ],
  templateUrl: './document-summary.component.html',
  styleUrl: './document-summary.component.sass'
})
export class DocumentSummaryComponent {
  @Input()
  summary?: string;
}
