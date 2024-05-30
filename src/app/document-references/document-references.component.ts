import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DocumentReference} from "../services/motions";
import {DocumentSummaryComponent} from "../document-summary/document-summary.component";
import {NgForOf, NgIf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";
import {LanguageService} from "../services/language.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'document-references',
  standalone: true,
  imports: [
    DocumentSummaryComponent,
    NgForOf,
    NgIf,
    TranslateModule
  ],
  templateUrl: './document-references.component.html',
  styleUrl: './document-references.component.sass'
})
export class DocumentReferencesComponent implements OnInit, OnDestroy {

  @Input()
  documentReference!: DocumentReference

  selectedLanguage: string = 'nl';
  languageSubscription?: Subscription;

  constructor(
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        this.selectedLanguage = language;
      }
    );
  }

  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

}
