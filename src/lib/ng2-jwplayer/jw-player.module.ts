import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { JwPlayerComponent } from './jw-player.component';

const declarables = [
    JwPlayerComponent
];

@NgModule({
    imports: [CommonModule],
    exports: [declarables],
    declarations: [declarables]
})
export class JwPlayerModule { }
