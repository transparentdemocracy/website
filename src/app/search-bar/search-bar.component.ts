import {Component, ElementRef, OnInit, output, ViewChild,} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';
import {ActivatedRoute, Router} from "@angular/router";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'search-bar',
  standalone: true,
  imports: [FontAwesomeModule, TranslateModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.sass',
})
export class SearchBarComponent implements OnInit {
  @ViewChild('searchBox', {static: true}) searchBox!: ElementRef;
  searchTriggered = output<string>();

  private previousSearchTerm: string = '';
  private router: Router
  private activatedRoute: ActivatedRoute
  private idInUrl: string = '';

  faMagnifyingGlass = faMagnifyingGlass;

  constructor(router: Router, activatedRoute: ActivatedRoute) {
    this.router = router;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const anId = params['id'];
      if (anId === undefined)
        this.idInUrl = '';
      else
        this.idInUrl = anId
    });
  }

  protected triggerSearch(searchTerm: string) {
    if (this.isTriggerSearchRequired(searchTerm)) {
      //redirect
      if (this.isSpecificIDSet()) {
        this.router.navigate(['../']);
      }
      this.previousSearchTerm = searchTerm;
      this.searchTriggered.emit(searchTerm);
    }
    this.searchBox.nativeElement.blur();
  }

  private isSpecificIDSet() {
    return this.idInUrl.length > 0;
  }

  hintSearch(keyword: string) {
    this.searchBox.nativeElement.value = keyword;
    this.triggerSearch(keyword);
  }

  private isTriggerSearchRequired(keyword: string): boolean {
    if (keyword.length == 0) {
      return true;
    }
    if (this.isSpecificIDSet()) {
      return true
    }
    return this.isValidSearchTerm(keyword);
  }

  private isValidSearchTerm(keyword: string) {
    return keyword.length > 2;
  }
}
