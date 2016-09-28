import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from '@angular/router';

import { JwPlayerComponent } from "./jw-player.component";

const declarables = [JwPlayerComponent];

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    exports: [declarables],
    declarations: [declarables]
})
export class ComponentsModule { }
