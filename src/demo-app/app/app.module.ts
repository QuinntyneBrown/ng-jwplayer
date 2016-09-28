/// <reference path="../../lib/ng2-jwplayer/index.d.ts" />

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { RouterModule  } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import "./rxjs-extensions";

import { AppComponent } from './app.component';

import { JwPlayerModule } from "../../lib/ng2-jwplayer/";

import {
    RoutingModule,
    routedComponents
} from "./routing";

const declarables = [
    AppComponent,
    ...routedComponents
];

const providers = [

];

@NgModule({
    imports: [
        JwPlayerModule,
        RoutingModule,

        BrowserModule,
        HttpModule,
        CommonModule,
        FormsModule,
        RouterModule
    ],
    providers: providers,
    declarations: [declarables],
    exports: [declarables],
    bootstrap: [AppComponent]
})
export class AppModule { }

