import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {LUCIDE_ICONS, LucideIconProvider, icons} from "lucide-angular";
import {provideAnimations} from "@angular/platform-browser/animations";
import {provideToastr} from "ngx-toastr";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    {provide: LUCIDE_ICONS, useValue: new LucideIconProvider(icons)},
    provideAnimations(),
    provideToastr({preventDuplicates: true})
  ]
};
