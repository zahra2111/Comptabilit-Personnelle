import { Routes } from '@angular/router';
import { AppConsultationComponent } from './consultation/consultation.component'

export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppConsultationComponent,
    data: {
      title: 'Starter Page',
    },
  },
];
