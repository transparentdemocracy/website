import {Component, Input} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faCircleInfo, faTriangleExclamation} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'document-summary',
    imports: [
        FontAwesomeModule,
        TranslateModule,
        CommonModule
    ],
    templateUrl: './document-summary.component.html',
    styleUrl: './document-summary.component.sass'
})
export class DocumentSummaryComponent {
  @Input()
  summary?: string;

  missingIcon = faCircleInfo;
  warningIcon = faTriangleExclamation;
}
