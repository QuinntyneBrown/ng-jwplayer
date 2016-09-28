import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";

const providers = [];

@NgModule({
    imports: [CommonModule, HttpModule],
	providers: providers
})
export class ServicesModule { }
