import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountComponent } from './bank-account.component';
import { BankAccountRoutingModule } from './bank-account-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})





@NgModule({
  declarations: [
    BankAccountComponent
  ],
  imports: [
    CommonModule,
    BankAccountRoutingModule
  ]
})
export class BankAccountModule { }