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
import { OverviewComponent } from './components/overview/overview.component';
import { ProductionoverviewComponent } from './components/productionoverview/productionoverview.component';
import { SettingdetailComponent } from './components/settingdetail/settingdetail.component';
import { TestComponent } from './test/test.component';
import { PopupwindowComponent } from './components/popupwindow/popupwindow.component';
import { LoggingService } from './services/LoggingService';


@NgModule({
  declarations: [
    AppComponent,
    HeroDetailComponent,
    HeroOverviewComponent,
    HomeComponent,
    SettingsComponent,
    BarComponent,
    ImagesComponent,
    SettingdetailComponent,
    OverviewComponent,
    ProductionoverviewComponent,
    PopupwindowComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [LoggingService],
  bootstrap: [AppComponent],
  exports: [AppRoutingModule]
})
export class AppModule { }
