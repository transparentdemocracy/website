/*plenaries.component.ts*/
import { CommonModule } from '@angular/common';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  Motion,
  MotionsHttpService,
  Page,
  Votes,
} from '../services/motions.http-service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import {Observable, ReplaySubject, Subscription, take} from 'rxjs';
import { PaginationComponent } from '../pagination/pagination.component';
import { SortVotesPipe } from '../sort-votes/sort-votes.pipe';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import {LanguageService} from "../services/language.service";

@UntilDestroy()
@Component({
  selector: 'plenaries',
  standalone: true,
  imports: [
    CommonModule,
    SearchBarComponent
  ],
  templateUrl: './plenaries.component.html',
  styleUrl: './plenaries.component.sass',
})
export class PlenariesComponent {
  searchPlenaries(searchTerm: string) {
    console.log(searchTerm)
  }
}
