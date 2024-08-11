import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

// Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

// Import Layouts
import { FullComponent } from './layouts/full/full.component';
import { BlankComponent } from './layouts/blank/blank.component';

// Vertical Layout
import { SidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/full/header/header.component';
import { BrandingComponent } from './layouts/full/sidebar/branding.component';
import { AppNavItemComponent } from './layouts/full/sidebar/nav-item/nav-item.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

// Pages
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { DebiterPopupComponent } from './components/debiter-popup/debiter-popup.component'; // Adjust path as needed
import { CrediterPopupComponent } from './components/crediter-popup/crediter-popup.component';
import { VirementPopupComponent } from './components/virement-popup/virement-popup.component';


import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Adjust path as needed
import { ReleverPopupComponent } from './relever-popup/relever-popup.component';



import { ImpressionExportationDeRapportPopupComponent } from './budget/impression-exportation-de-rapport-popup/impression-exportation-de-rapport-popup.component';
import { ModifierMontantsBudgetairePopupComponent } from './budget/modifier-montants-budgetaire-popup/modifier-montants-budgetaire-popup.component';
import { SelectionPeriodeBudgetPopupComponent } from './budget/selection-periode-budget-popup/selection-periode-budget-popup.component';
import { GestionDepensesRevenusPopupComponent } from './budget/gestion-depenses-revenus-popup/gestion-depenses-revenus-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    BlankComponent,
    SidebarComponent,
    HeaderComponent,
    BrandingComponent,
    AppNavItemComponent,
    UserProfileComponent,
    SettingsComponent,
    DebiterPopupComponent, // Add the DebiterPopupComponent here
    CrediterPopupComponent, // Add the CrediterPopupComponent here
    VirementPopupComponent,
    
   
    ImpressionExportationDeRapportPopupComponent,
    ModifierMontantsBudgetairePopupComponent,
    SelectionPeriodeBudgetPopupComponent,
    GestionDepensesRevenusPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    HttpClientModule,
    ReleverPopupComponent,
  ],
  exports: [TablerIconsModule],
  bootstrap: [AppComponent],
  providers: [
    provideAnimationsAsync()
  ],
})
export class AppModule {}
