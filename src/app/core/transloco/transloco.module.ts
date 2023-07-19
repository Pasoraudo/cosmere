import {
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  translocoConfig,
  TranslocoModule,
  TranslocoService
} from '@ngneat/transloco';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {firstValueFrom} from 'rxjs';
import {environment} from '../../../environments/environment';
import {TranslocoHttpLoader} from './transloco.http-loader';

@NgModule({
  exports: [
    TranslocoModule
  ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: [
          {
            id: 'es',
            label: 'Español'
          },
          {
            id: 'en',
            label: 'English'
          }
        ],
        defaultLang: 'en',
        fallbackLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production
      })
    },
    {
      // Provide the default Transloco loader
      provide: TRANSLOCO_LOADER,
      useClass: TranslocoHttpLoader
    },
    {
      // Preload the default language before the app starts to prevent empty/jumping content
      provide: APP_INITIALIZER,
      deps: [TranslocoService],
      useFactory: (translocoService: TranslocoService): any => (): Promise<Translation> => {
        const defaultLang = translocoService.getDefaultLang();
        translocoService.setActiveLang(defaultLang);
        return firstValueFrom(translocoService.load(defaultLang));
      },
      multi: true
    }
  ]
})
export class TranslocoCoreModule {
}
