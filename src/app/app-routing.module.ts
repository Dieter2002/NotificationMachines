import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

//Extern pages
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroOverviewComponent } from './components/hero-overview/hero-overview.component';
import { HomeComponent } from './components/home/home.component';
import { ImagesComponent } from './components/images/images.component';
import { ProductionoverviewComponent } from './components/productionoverview/productionoverview.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TestComponent } from './test/test.component';

const routes: Routes = [
  // { path: '', component: AppComponent },
  // { path: '', component: HeroDetailComponent },
  { path: '', component: HeroDetailComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'images', component: ImagesComponent },
  { path: 'test', component: TestComponent },
  { path: 'productionoverview', component: ProductionoverviewComponent },
  {
    path: "home",
    component: HomeComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "create", component: HomeComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
