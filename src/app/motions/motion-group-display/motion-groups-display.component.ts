import {Component, Input} from '@angular/core';
import {faCaretRight, faCheckCircle, faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {DocumentReference, Motion, MotionGroup, Votes} from "../../services/motions";
import {dateConversion} from "../../services/date-service";
import {LanguageService} from "../../services/language.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {LanguagePluralPipe} from "../../language/pluralization/language-plural.pipe";
import {TranslateModule} from "@ngx-translate/core";
import {CommonModule} from "@angular/common";
import {DocumentReferencesComponent} from "../../document-references/document-references.component";
import {SortPipe} from "../../sort-votes/sort-votes.pipe";

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
export class MotionGroupsDisplayComponent {

  @Input() motionGroups!: ViewMotionGroup[];

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

  toggleShowAllVotes(btnElement: HTMLElement, divElement: HTMLElement): void {
    divElement.classList.toggle('showAllVotes');
    btnElement.hidden = true;
  }

  removeSpaces(input: string): string {
    return input.replace(/\s+/g, '');
  }

}


export class ViewMotionGroup {
  constructor(m: MotionGroup) {
    this.motionGroup = m;
    this.isExpanded = false;
    this.viewMotions = m.motions.map((motion) => new ViewMotion(motion));
  }

  // TODO review this pattern; using function calls in templates results in a lot of overhead and recalculation
  // E.g. add a console.log here and see that it's called all the time even when just clicking around
  get legislature(): number {
    return this.motionGroup.legislature
  }

  get plenaryNr(): number {
    return this.motionGroup.plenaryNr
  }

  get titleNL(): string {
    return this.motionGroup.titleNL;
  }

  get motions(): ViewMotion[] {
    return this.viewMotions;
  }

  get id(): string {
    return this.motionGroup.id;
  }

  get titleFR(): string {
    return this.motionGroup.titleFR;
  }

  get votingDate(): string {
    return dateConversion(this.motionGroup.votingDate);
  }

  isExpanded: boolean;
  viewMotions: ViewMotion[];
  motionGroup: MotionGroup;
}

export class ViewMotion {
  get votingDate(): string {
    return dateConversion(this.motion.votingDate);
  }

  get titleNL(): string {
    return this.motion.titleNL;
  }

  get id(): string {
    return this.motion.id;
  }

  get documentReference(): DocumentReference | undefined {
    return this.motion.newDocumentReference;
  }


  get titleFR(): string {
    return this.motion.titleFR;
  }

  get yesVotes(): Votes {
    return this.motion.yesVotes;
  }

  get noVotes(): Votes {
    return this.motion.noVotes;
  }

  get absVotes(): Votes {
    return this.motion.absVotes;
  }

  get votingResult(): boolean {
    return this.motion.votingResult;
  }

  constructor(m: Motion) {
    this.motion = m;
    this.isExpanded = false;
  }

  motion: Motion;
  isExpanded: boolean;
}
