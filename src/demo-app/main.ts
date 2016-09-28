import { enableProdMode } from "@angular/core";
import { AppModule } from "./app";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
