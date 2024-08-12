import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

//Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { UserService } from './services/User/user.service';
import { provideClientHydration } from '@angular/platform-browser';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { CompteBancaireService } from './services/CompteBancaire/compte-bancaire.service';
import { AuthInterceptor } from './auth.interceptor';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {  HttpClient } from '@angular/common/http';
import { BankAccountComponent } from './pages/bank-account/bank-account.component';
import { DebiterPopupComponent } from './pages/debiter-popup/debiter-popup.component'; // Adjust path as needed
import { CrediterPopupComponent } from './pages/crediter-popup/crediter-popup.component';
import { PopupService } from './services/popup.service'; // Import the service
import {BudgetService} from './services/Budget/budget.service';
import { BudgetComponent } from './pages/budget/budget.component';
import { MatDatepickerModule } from '@angular/material/datepicker'; // Ensure this is imported
import { MatNativeDateModule } from '@angular/material/core'; // Ensure this is imported
import { MatSelectModule } from '@angular/material/select'; // Import MatSelectModule
import { CategoryComponent } from './pages/category/category.component';
import { TierComponent } from './pages/tier/tier.component';
import { AddbudgetComponent } from './pages/addbudget/addbudget/addbudget.component';
import { AddTierComponent } from './pages/addtier/add-tier/add-tier.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {AppConsultationComponent }from './pages/consultation/consultation.component';
import {ConfirmDialogComponent } from './pages/tier/confirm-dialog/confirm-dialog.component';
import { VirementPopupComponent } from './pages/virement-popup/virement-popup.component'; // Adjust path as needed
import { ConfirmDeleteBudgeComponent }from './pages/budget/confirm-delete-budge/confirm-delete-budge.component'
import { ConfirmDeleteComponent } from"./pages/confirm-delete/confirm-delete.component";
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppConsultationComponent,
    ConfirmDeleteComponent,
    VirementPopupComponent,
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    ConfirmDialogComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    UserProfileComponent,
    BankAccountComponent, 
    DebiterPopupComponent, // Add the DebiterPopupComponent here
    CrediterPopupComponent,
    BudgetComponent,
    CategoryComponent,
    TierComponent,
    AddbudgetComponent,
    AddTierComponent,
    ConfirmDeleteBudgeComponent
    
    ],
  imports: [
    MatNativeDateModule, // Ensure this is included
    MatSelectModule, // Include MatSelectModule
    MatFormFieldModule,
    BrowserModule,
    MatInputModule,
    MatSnackBarModule,
    MatButtonModule,
    MatDialogModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    MatTableModule, // Angular Material table module
    MatMenuModule, // Angular Material menu module
    MatIconModule, // Angular Material icon module
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    TablerIconsModule,
    MatNativeDateModule, // Ensure this is included
    MatSelectModule // Include MatSelectModule


  ],
  bootstrap: [
    AppComponent
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    provideClientHydration(),
    UserService,
     CompteBancaireService,
     provideHttpClient(withFetch()), 
     PopupService ,
     BudgetService

  ],
  
})
export class AppModule {
  
}
