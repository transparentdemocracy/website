import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'language-selector',
  standalone: true,
  imports: [],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.sass'
})
export class LanguageSelector {
  @Output() languageChanged$ = new EventEmitter<string>();

  protected triggerLanguageChange(selectedLanguage: string) {
    console.log("Language changed to " + selectedLanguage);
    this.languageChanged$.emit(selectedLanguage);
  }
}
