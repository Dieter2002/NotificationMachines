import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

//Extern pages
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroOverviewComponent } from './hero-overview/hero-overview.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  // { path: '', component: AppComponent },
  // { path: '', component: HeroDetailComponent },
  { path: '', component: HeroDetailComponent },
  { path: 'settings', component: SettingsComponent },
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
