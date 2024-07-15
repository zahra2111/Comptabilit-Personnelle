
import { AppDashboardComponent } from './dashboard/dashboard.component'
import { RouterModule, Routes } from '@angular/router';
export const PagesRoutes: Routes = [
  {
    path: '',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
];




