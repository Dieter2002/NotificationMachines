import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

//Extern pages
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroOverviewComponent } from './hero-overview/hero-overview.component';

const routes: Routes = [
  // { path: '', component: AppComponent },
  // { path: '', component: HeroDetailComponent },
  // { path: 'heroes-detail', component: HeroDetailComponent },
  // { path: 'heroes-overview', component: HeroOverviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
