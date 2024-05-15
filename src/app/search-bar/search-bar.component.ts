import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.sass'
})
export class SearchBarComponent {
  @Output() searchTriggered$ = new EventEmitter<string>();

  protected triggerSearch(searchTerm: string) {
    this.searchTriggered$.emit(searchTerm);
  }
}
