import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {FuseModule} from '../@fuse';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FuseConfigModule} from '../@fuse/services/config';
import {FuseMockApiModule} from '../@fuse/lib/mock-api';
import {CoreModule} from './core/core.module';
import {LayoutModule} from './layout/layout.module';
import {mockApiServices} from './mock-api';
import {appConfig} from './core/config/app.config';
import {MarkdownModule} from 'ngx-markdown';
import {DomainModule} from '../domain/domain.module';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {LayoutNoBarModule} from './ui/shared/layout/layout.module';
import {LayoutUserModule} from './ui/shared/layout/layout-user.module';
import {MatRadioModule} from '@angular/material/radio';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {PipeModule} from 'app/ui/shared/pipe/pipe.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {JwtInterceptor} from '../domain/service/network/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    PipeModule,
    BrowserModule,
    IonicModule.forRoot({
      mode: 'md',
    }),
    AppRoutingModule,
    BrowserAnimationsModule,
    FuseModule,
    FuseConfigModule.forRoot(appConfig),
    FuseMockApiModule.forRoot(mockApiServices),
    DomainModule,

    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    MatRadioModule,

    // Core module of your application
    CoreModule,

    // Layout module of your application
    LayoutModule,
    LayoutUserModule,
    LayoutNoBarModule,

    // 3rd party modules that require global configuration via forRoot
    MarkdownModule.forRoot({}),

    NgSelectModule,


  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
