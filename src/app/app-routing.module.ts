import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersoaneComponent } from './persoane/persoane.component';
import { MasiniComponent } from './masini/masini.component';

const routes: Routes = [
  { path: 'persoane', component: PersoaneComponent },
  { path: 'masini', component: MasiniComponent },
  { path: '', redirectTo: '/persoane', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
