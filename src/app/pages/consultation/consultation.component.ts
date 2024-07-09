import { Component, ViewEncapsulation } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';

import * as TablerIcons from 'angular-tabler-icons/icons';

export interface Transaction {
  date: string;
  description: string;
  paymentMode: string;
  tiers: string;
  categories: string;
  ref: string;
  debit: number;
  credit: number;
}

const TRANSACTION_DATA: Transaction[] = [
  { date: '01/01/2023', description: 'Payment received', paymentMode: 'Credit Card', tiers: 'Tier 1', categories: 'Sales', ref: 'REF123', debit: 500, credit: 0 },
  { date: '02/01/2023', description: 'Payment made', paymentMode: 'Bank Transfer', tiers: 'Tier 2', categories: 'Purchase', ref: 'REF124', debit: 0, credit: 200 },
  // Add more transactions as needed
];

@Component({
  selector: 'app-Consultation',
  templateUrl: './consultation.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppConsultationComponent {
  displayedColumns: string[] = ['date', 'description', 'paymentMode', 'tiers', 'categories', 'ref', 'debit', 'credit', 'actions'];
  dataSource = TRANSACTION_DATA;
   editIcon = TablerIcons.IconEdit;
   trashIcon = TablerIcons.IconTrash;

  constructor() {}

  modifierTransaction(transaction: Transaction) {
    // Implement edit functionality here
    console.log('Modifier clicked for:', transaction);
  }

  supprimerTransaction(transaction: Transaction) {
    // Implement delete functionality here
    console.log('Supprimer clicked for:', transaction);
  }
}
