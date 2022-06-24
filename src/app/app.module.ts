import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroOverviewComponent } from './components/hero-overview/hero-overview.component';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { BarComponent } from './components/bar/bar.component';
import { ImagesComponent } from './components/images/images.component';
import { SettingdetailComponent } from './settingdetail/settingdetail.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroOverviewComponent,
    HomeComponent,
    SettingsComponent,
    BarComponent,
    ImagesComponent,
    SettingdetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule]
})
export class AppModule { }
