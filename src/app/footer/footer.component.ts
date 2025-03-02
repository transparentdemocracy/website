import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'footer',
    imports: [TranslateModule],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.sass'
})
export class FooterComponent {}
