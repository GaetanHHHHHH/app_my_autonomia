import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ActualiteComponent } from './actualite/actualite.component';
import { ActualitesListComponent } from './actualites-list/actualites-list.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SingleActualiteComponent } from './single-actualite/single-actualite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewActualiteComponent } from './new-actualite/new-actualite.component';
import { HttpClientModule } from '@angular/common/http';
import { ChangeActualiteComponent } from './change-actualite/change-actualite.component'

@NgModule({
  declarations: [
    AppComponent,
    ActualiteComponent,
    ActualitesListComponent,
    HeaderComponent,
    LandingPageComponent,
    SingleActualiteComponent,
    NewActualiteComponent,
    ChangeActualiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
