import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Accordion, AccordionGroup } from "./accordion";

@NgModule({
imports: [
    CommonModule
],
declarations: [
    Accordion,
    AccordionGroup
],
exports: [
    Accordion,
    AccordionGroup
]
})
export class AccordionModule {}