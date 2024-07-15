import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConsultationComponent } from './consultation.component';

const routes: Routes = [
  { path: '', component: AppConsultationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultationRoutingModule { }
