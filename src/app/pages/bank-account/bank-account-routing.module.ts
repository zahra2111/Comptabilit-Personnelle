import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BankAccountComponent } from './bank-account.component';

const routes: Routes = [
  { path: '', component: BankAccountComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class BankAccountRoutingModule { }








