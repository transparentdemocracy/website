import {Component} from '@angular/core';
import {RouterLink, RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faQuestionCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
    selector: 'navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.sass',
    imports: [FontAwesomeModule, RouterLink, RouterModule, TranslateModule]
})
export class NavigationComponent {
  questionIcon = faQuestionCircle;
}
