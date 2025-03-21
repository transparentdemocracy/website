import {Component, inject, Input, output} from '@angular/core';
import {FormBuilder, FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {TranslateModule} from "@ngx-translate/core";
import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";

interface DateRange {
  start?: string,
  end?: string
}

@Component({
    selector: 'search-bar',
    imports: [
        FormsModule,
        FaIconComponent,
        TranslateModule,
        MatDatepickerModule,
        MatInputModule
    ],
    templateUrl: './search-bar.component.html',
    styleUrl: './search-bar.component.sass'
})
export class SearchBarComponent {
  @Input() searchTerm!: string
  searchTermChange = output<string>()
  selectedDateRange: DateRange = {}
  hasDateRange = false
  newSearch = output<string>()

  showAdvanced = true
  faMagnifyingGlass = faMagnifyingGlass;

  constructor(public dialog: MatDialog) {
  }

  triggerNewSearch(searchTerm: string) {
    this.newSearch.emit(searchTerm);
  }

  openDateRangeDialog() {
    const dialogRef = this.dialog.open(DatePickerDialog, {
      minWidth: '500px',
      data: this.selectedDateRange,
    });

    dialogRef.afterClosed().subscribe((result: DateRange) => {
      this.selectedDateRange = result;
      this.hasDateRange = (!!this.selectedDateRange.start || !!this.selectedDateRange.end)
    });
  }

  toggleAdvanced() {
    this.showAdvanced = !this.showAdvanced;
  }
}

@Component({
    selector: 'datepicker-dialog',
    templateUrl: 'date-picker-dialog.html',
    imports: [
        MatDatepickerModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
    ]
})
class DatePickerDialog {
  range: DateRange = inject(MAT_DIALOG_DATA);

  start!: FormControl
  end!: FormControl

  constructor(fb: FormBuilder) {
    this.start = fb.control(this.range.start);
    this.end = fb.control(this.range.end);
  }
}
