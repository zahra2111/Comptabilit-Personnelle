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
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppConsultationComponent {
  displayedColumns: string[] = ['date', 'description', 'paymentMode', 'tiers', 'categories', 'ref', 'debit', 'credit', 'actions'];
  dataSource = TRANSACTION_DATA;
  editIcon = TablerIcons.IconEdit;
  trashIcon = TablerIcons.IconTrash;
  selectedDate: Date | null = null;
  selectedCategory: string | null = null;
  selectedPaymentMode: string | null = null;

  categories: string[] = ['Sales', 'Purchase', 'Miscellaneous']; // Example categories
  paymentModes: string[] = ['Credit Card', 'Bank Transfer', 'Cash']; // Example payment modes

  constructor() {}

  modifierTransaction(transaction: Transaction) {
    // Implement edit functionality here
    console.log('Modifier clicked for:', transaction);
  }

  supprimerTransaction(transaction: Transaction) {
    // Implement delete functionality here
    console.log('Supprimer clicked for:', transaction);
  }

  filterByDate(date: Date) {
    this.selectedDate = date;
    // Implement your date filter logic here
    console.log('Date filter applied:', date);
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
    // Implement your category filter logic here
    console.log('Category filter applied:', category);
  }

  filterByPaymentMode(paymentMode: string) {
    this.selectedPaymentMode = paymentMode;
    // Implement your payment mode filter logic here
    console.log('Payment mode filter applied:', paymentMode);
  }
}
