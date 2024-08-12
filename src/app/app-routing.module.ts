import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { BankAccountComponent } from './pages/bank-account/bank-account.component';
import { DebiterPopupComponent } from './pages/debiter-popup/debiter-popup.component'; // Adjust path as needed
import { CrediterPopupComponent } from './pages/crediter-popup/crediter-popup.component';
import { BudgetComponent } from './pages/budget/budget.component';
import { CategoryComponent } from './pages/category/category.component';
import { TierComponent } from './pages/tier/tier.component';
import {AppConsultationComponent }from './pages/consultation/consultation.component';
import { VirementPopupComponent } from './pages/virement-popup/virement-popup.component'; // Adjust path as needed

const routes: Routes = [
  {
    path: '',
    redirectTo: '/authentification/login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      
      {
        path: 'ui-components',
        loadChildren: () =>
          import('./pages/ui-components/ui-components.module').then(
            (m) => m.UicomponentsModule
          ),
      },
      {
        path: 'extra',
        loadChildren: () =>
          import('./pages/extra/extra.module').then((m) => m.ExtraModule),
      },
      {
        path: 'profile',
        component: UserProfileComponent,
      },
      {
        path: 'budgets',
        component: BudgetComponent,
      },
      {
        path: 'debiter',
        component: DebiterPopupComponent,
      },
      {
        path: 'virement',
        component: VirementPopupComponent,
      },
      {
        path: 'crediter',
        component: CrediterPopupComponent,
      },
      {
        path: 'bank-account',
        component: BankAccountComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      }
      ,
      {
        path: 'consultation',
        component: AppConsultationComponent,
      }
      ,
      {
        path: 'tier',
        component: TierComponent,
      }
    ],
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentification',
        loadChildren: () =>
          import('./pages/authentication/authentication.module').then(
            (m) => m.AuthenticationModule
          ),
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
