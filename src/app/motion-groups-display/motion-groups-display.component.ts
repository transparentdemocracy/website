import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {faCaretRight, faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MotionGroup} from "../services/motions";
import {LanguageService} from "../services/language.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {LanguagePluralPipe} from "../language/pluralization/language-plural.pipe";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {DocumentReferencesComponent} from "../document-references/document-references.component";
import {SortPipe} from "../sort-votes/sort-votes.pipe";

@Component({
  selector: 'motion-groups-display',
  standalone: true,
  imports: [
    FontAwesomeModule,
    LanguagePluralPipe,
    TranslateModule,
    CommonModule,
    DocumentReferencesComponent,
    SortPipe
  ],
  templateUrl: './motion-groups-display.component.html',
  styleUrl: './motion-groups-display.component.sass'
})
export class MotionGroupsDisplayComponent implements OnChanges {

  @Input() motionGroups!: MotionGroup[];
  expanded: { [key: string]: boolean } = {}

  selectedLanguage = 'nl';

  caretRight = faCaretRight;
  acceptedIcon = faCheckCircle;
  rejectedIcon = faTimesCircle;

  constructor(private languageService: LanguageService) {
    languageService.language$.pipe(
      takeUntilDestroyed()
    ).subscribe(language => {
      this.selectedLanguage = language
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.expanded = {}
  }

  toggleShowAllVotes(btnElement: HTMLElement, divElement: HTMLElement): void {
    divElement.classList.toggle('showAllVotes');
    btnElement.hidden = true;
  }

  removeSpaces(input: string): string {
    return input.replace(/\s+/g, '');
  }

}
