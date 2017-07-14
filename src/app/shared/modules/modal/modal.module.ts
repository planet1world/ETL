import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ModalComponent } from './modal.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [ModalComponent],
    exports: [ModalComponent]
})
export class ModalModule { }
