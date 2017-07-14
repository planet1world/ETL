import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageModalComponent } from './page-modal.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [PageModalComponent],
    exports: [PageModalComponent]
})
export class PageModalModule { }
