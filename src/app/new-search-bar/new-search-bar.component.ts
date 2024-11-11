import {ChangeDetectionStrategy, Component, forwardRef, Input, output} from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {TranslateModule} from "@ngx-translate/core";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'new-search-bar',
  standalone: true,
  imports: [
    FormsModule,
    FaIconComponent,
    TranslateModule
  ],
  templateUrl: './new-search-bar.component.html',
  styleUrl: './new-search-bar.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSearchBarComponent {

  @Input() searchTerm!: string;
  searchTermChange = output<string>();

  newSearch = output<string>();

  faMagnifyingGlass = faMagnifyingGlass;


  triggerNewSearch(searchTerm: string) {
    this.newSearch.emit(searchTerm);
  }

}
