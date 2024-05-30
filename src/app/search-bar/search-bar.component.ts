import {Component, ElementRef, EventEmitter, Output, ViewChild,} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.sass',
})
export class SearchBarComponent {
  @ViewChild('searchBox', {static: true}) searchBox!: ElementRef;
  @Output() searchTriggered$ = new EventEmitter<string>();

  private previousSearchTerm: string = '';

  protected triggerSearch(searchTerm: string) {
    if (this.isTriggerSearchRequired(searchTerm)) {
      this.previousSearchTerm = searchTerm;
      this.searchTriggered$.emit(searchTerm);
    }
  }

  hintSearch(keyword: string) {
    this.searchBox.nativeElement.value = keyword;
    this.triggerSearch(keyword);
  }

  private isTriggerSearchRequired(keyword: string): boolean {
    //When the searchTerm was cleared, this also warrants a new search
    if (this.previousSearchTerm.length > 0 && keyword.length == 0) {
      return true;
    } else
      return this.isValidSearchTerm(keyword);
  }

  private isValidSearchTerm(keyword: string) {
    return keyword.length > 0 &&
      keyword.length <= 100 &&
      /^[a-zA-Z0-9\s]+$/.test(keyword);
  }
}
