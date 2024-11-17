import {ChangeDetectionStrategy, Component, forwardRef, Input, OnChanges, output, SimpleChanges} from '@angular/core';
import {FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {TranslateModule} from "@ngx-translate/core";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [
    FormsModule,
    FaIconComponent,
    TranslateModule,
    MatDatepickerModule,
    MatInputModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchBarComponent {

  @Input() searchTerm!: string;
  searchTermChange = output<string>();

  newSearch = output<string>();

  faMagnifyingGlass = faMagnifyingGlass;

  triggerNewSearch(searchTerm: string) {
    this.newSearch.emit(searchTerm);
  }

}
