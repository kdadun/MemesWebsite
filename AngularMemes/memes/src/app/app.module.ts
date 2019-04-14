import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './shared/routes';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AuthenticationService } from './shared/services/authentication.service';
import { AuthGuard } from './shared/authGuart';
import { Global } from './shared/global';
import { MemService } from './shared/services/mem.service';
import { SharedService } from './shared/services/shared.service';
import { AccountComponent } from './account/account.component';
import { SetImageComponent } from './account/set-image/set-image.component';
import { MemesComponent } from './memes/memes.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { MemesDetailsComponent } from './memes/memes-details/memes-details.component';
import { RatingComponent } from './memes/rating/rating.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegistrationComponent,
    LoginComponent,
    AccountComponent,
    SetImageComponent,
    MemesComponent,
    MemesDetailsComponent,
    RatingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [AuthenticationService, MemService, SharedService, Global],
  bootstrap: [AppComponent]
})
export class AppModule { }
