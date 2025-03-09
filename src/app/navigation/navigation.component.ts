import {Component} from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";
import {LanguageSelector} from "../language/language-selector/language-selector.component";
import {faUser} from "@fortawesome/free-solid-svg-icons/faUser";
import {environment} from "../../environments/environment";

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.sass',
  imports: [FontAwesomeModule, RouterLink, RouterModule, TranslateModule, LanguageSelector]
})
export class NavigationComponent {
  questionIcon = faQuestionCircle;
  showLogin: boolean = environment.showLogin
  userIcon = faUser;
}
