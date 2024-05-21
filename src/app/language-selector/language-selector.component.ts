import { Component, EventEmitter, Output } from '@angular/core';
import {LanguageService} from "../services/language.service";

@Component({
  selector: 'language-selector',
  templateUrl: './language-selector.component.html',
  standalone: true,
  styleUrl: './language-selector.component.sass'
})
export class LanguageSelector {
  constructor(private languageService: LanguageService) { }

  triggerLanguageChange(selectedLanguage: string) {
    this.languageService.setLanguage(selectedLanguage)
  }
}
