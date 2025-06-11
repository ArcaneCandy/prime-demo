import {
  HttpClient,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { OAuthModule } from 'angular-oauth2-oidc';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GlobalErrorHandlerService } from './shared/services/global-error-handler.service';
import { ToastNotificationService } from './shared/services/toast-notification.service';
import { CopyToClipboardDirective } from './shared/directives/copy-to-clipboard.directive';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ToastModule,
    TranslateModule,
    TooltipModule,
    ButtonModule,
    NgxsModule.forRoot([], {
      developmentMode: true,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService],
      multi: true,
    },
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    ToastNotificationService,
    MessageService,
    CopyToClipboardDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function httpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http);
}

export function appInitializerFactory(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('en');
    return translate.use('en');
  };
}
