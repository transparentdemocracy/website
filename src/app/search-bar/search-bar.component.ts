import {
  Component,
  ViewChild,
  ElementRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.sass',
})
export class SearchBarComponent {
  @ViewChild('searchBox', { static: true }) searchBox!: ElementRef;
  @Output() searchTriggered$ = new EventEmitter<string>();

  protected triggerSearch(searchTerm: string) {
    if (this.isValidSearch(searchTerm)) {
      this.searchTriggered$.emit(searchTerm);
    }
  }

  hintSearch(keyword: string) {
    this.searchBox.nativeElement.value = keyword;
    this.triggerSearch(keyword);
  }

  isValidSearch(keyword: string): boolean {
    return (
      keyword.length > 0 &&
      keyword.length <= 100 &&
      /^[a-zA-Z0-9\s]+$/.test(keyword)
    );
  }
}
