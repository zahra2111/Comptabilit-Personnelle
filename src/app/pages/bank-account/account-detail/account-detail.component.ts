import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompteBancaireService } from '../../../services/CompteBancaire/compte-bancaire.service';
import { Transaction } from '../../../services/transaction/Transaction';
import { TransactionService } from '../../../services/transaction/transaction.service';
import { switchMap, catchError } from 'rxjs/operators';
import { BankAccount } from '../../../services/CompteBancaire/compteBancaire';
import { Observable, of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-compte-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class CompteDetailComponent implements OnInit {
  bankAccount: BankAccount | null = null;
  transactions: Transaction[] = [];
  isLoading = true;

  constructor(
    private compteBancaireService: CompteBancaireService,
    private transactionService: TransactionService,
    public dialogRef: MatDialogRef<CompteDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { bankAccountId: number }
  ) {}

  ngOnInit(): void {
    this.loadBankAccountDetails();
  }

  private loadBankAccountDetails(): void {
    this.compteBancaireService.getCompteBancaireById(this.data.bankAccountId).subscribe(bankAccount => {
      this.bankAccount = bankAccount;

      if (this.bankAccount && this.bankAccount.transactions) {
        this.loadTransactions();
      }
    });
  }
  private loadTransactions(): void {
    if (this.bankAccount?.transactions) {
      const transactionObservables = this.bankAccount.transactions.map(transactionIri =>
        this.transactionService.getTransactionDetailsFromIri(transactionIri)
      );
  
      forkJoin(transactionObservables).pipe(
        switchMap(transactions => {
          this.transactions = transactions.filter((transaction): transaction is Transaction => transaction !== null);
          this.isLoading = false;
          return of(this.transactions);
        }),
        catchError(error => {
          console.error('Error fetching transactions:', error);
          this.isLoading = false;
          this.transactions = [];
          return of([]);
        })
      ).subscribe();
    } else {
      this.isLoading = false;
      this.transactions = [];
    }
  }
  

  calculateTotal(): number {
  if (!this.bankAccount || !this.transactions) {
    return 0;
  }

  let total = Number(this.bankAccount.initialSum) || 0;
  console.log('Initial Sum:', total);

  for (const transaction of this.transactions) {
    const amount = Number(transaction.amount);
    if (!isNaN(amount)) {
      if (transaction.type === 'debit') {
        total -= amount;
        console.log(`Debit: ${amount}, New Total: ${total}`);
      } else if (transaction.type === 'credit') {
        total += amount;
        console.log(`Credit: ${amount}, New Total: ${total}`);
      }
    } else {
      console.error('Invalid transaction amount:', transaction.amount);
    }
  }

  console.log('Final Total:', total);
  return total;
}

  close(): void {
    this.dialogRef.close();
  }
}
