import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TransactionService } from '../../services/transaction/transaction.service';
import { Transaction } from '../../services/transaction/Transaction';
import { AuthService } from '../../services/auth/auth.service';
import { DebiterPopupComponent } from '../debiter-popup/debiter-popup.component';
import { CrediterPopupComponent } from '../crediter-popup/crediter-popup.component';
import { VirementPopupComponent } from '../virement-popup/virement-popup.component';
import { UserService } from '../../services/User/user.service';
import { TierService } from '../../services/tier/tier.service';
import { CompteBancaireService } from '../../services/CompteBancaire/compte-bancaire.service';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component'; // Update the import path as needed
import { TranslateService } from '@ngx-translate/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import * as TablerIcons from 'angular-tabler-icons/icons';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss']
})
export class AppConsultationComponent implements OnInit {
  displayedColumns: string[] = ['n°', 'date', 'description', 'paymentMode','Compte', 'Montant', 'tiers', 'actions'];
  editIcon = TablerIcons.IconEdit;
  trashIcon = TablerIcons.IconTrash;
  transactions: Transaction[] = [];
  userIden: number | 0 = 0;
  tierMap: { [key: string]: string } = {}; // Maps tier URL to tier name
  isLoading = true;
  selectedDate: Date | null = null;
  filteredTransactions: Transaction[] = [];
  tiers: string[] = []; // Initialize with actual tiers
  selectedTier: string | null = null;
  bankName: string | null = null;
  constructor(
    private translate: TranslateService,

    public dialog: MatDialog,
    private authService: AuthService,
    private transactionService: TransactionService,
    private userService: UserService,
    private compteService: CompteBancaireService,

    private tierService: TierService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTransactions();
    this.authService.getCurrentUserId().subscribe(id => {
      this.userIden = id;
      console.log('User ID:', this.userIden);
    });
    this.translate.setDefaultLang('fr');
  }

  fetchTierDetails(transactions: Transaction[]): void {
    const tierUrls = new Set(transactions.map(t => t.tiers).filter(url => url !== undefined));
    tierUrls.forEach(tierUrl => {
      if (tierUrl) {
        const tierId = this.extractTierId(tierUrl);
        if (tierId) {
          this.tierService.getTierById(tierId).subscribe(tier => {
            this.tierMap[tierUrl] = tier.nom;
            if (!this.tiers.includes(tier.nom)) {
              this.tiers.push(tier.nom); // Populate tiers dropdown
            }
          }, error => {
            console.error('Error fetching tier:', error);
            this.snackBar.open('Error fetching tier', 'Close', { duration: 2000 });
          });
        }
      }
    });
  }

  extractTierId(tierUrl: string | undefined): number | null {
    if (!tierUrl) {
      console.error('Tier URL is undefined or null');
      return null;
    }
    const matches = tierUrl.match(/\/api\/tiers\/(\d+)/);
    return matches ? +matches[1] : null;
  }

  openAddDebitDialog(): void {
    const dialogRef = this.dialog.open(DebiterPopupComponent, {
      width: '400px'
    });

    dialogRef.componentInstance.transactionAdded.subscribe(() => this.loadTransactions());

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const t = new Transaction(
          "debit",
          result.amount,
          result.Notes,
          result.date,
          `api/users/${this.userIden}`,
          `api/banks/${result.bankID}`,
          `api/tiers/${result.tierID}`
        );

        this.transactionService.addTransaction(t)
          .subscribe(response => {
            console.log('Transaction added successfully', response);
            this.loadTransactions();
          }, error => {
            console.error('Error adding transaction', error);
          });
      }
    });
  }

  openAddCreditDialog(): void {
    const dialogRef = this.dialog.open(CrediterPopupComponent, {
      width: '400px'
    });
    dialogRef.componentInstance.transactionAdded.subscribe(() => this.loadTransactions());

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const t = new Transaction(
          "credit",
          result.amount,
          result.Notes,
          result.date,
          `api/users/${this.userIden}`,
          `api/banks/${result.bankID}`,
          `api/tiers/${result.tierID}`
        );

        this.transactionService.addTransaction(t)
          .subscribe(response => {
            console.log('Transaction added successfully', response);
            this.loadTransactions();
          }, error => {
            console.error('Error adding transaction', error);
          });
      }
    });
  }

  openAddVirementDialog(): void {
    const dialogRef = this.dialog.open(VirementPopupComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const t = new Transaction(
          "virement",
          result.amount,
          result.Notes,
          result.date,
          `api/users/${this.userIden}`,
          `api/banks/${result.bankID}`,
          `api/tiers/${result.tierID}`
        );

        this.transactionService.addTransaction(t)
          .subscribe(response => {
            console.log('Transaction added successfully', response);
            this.loadTransactions();
          }, error => {
            console.error('Error adding transaction', error);
          });
      }
    });
  }
  loadTransactions(): void {
    this.isLoading = true; // Start the spinner
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.userService.getTransactions(userId).subscribe(transactions => {
          this.transactions = transactions;
          this.filteredTransactions = transactions;
          this.fetchTierDetails(transactions);
          
          // Fetch bank details for each transaction
          transactions.forEach(transaction => {
            const bankIri = transaction.Compte;
            if (bankIri) {
              this.compteService.getBankByIri(bankIri).subscribe(bankDetails => {
                this.bankName = bankDetails.nom; // Assuming `name` is the property of bank details
              }, error => {
                console.error('Error fetching bank name:', error);
                transaction.Compte = 'Unknown'; // Fallback in case of error
              });
            } else {
              transaction.Compte = 'Unknown'; // Handle case where bank IRI is not available
            }
          });
  
          this.isLoading = false;
        }, error => {
          console.error('Error fetching transactions:', error);
          this.snackBar.open('Error fetching transactions', 'Close', { duration: 2000 });
          this.isLoading = false;
        });
      } else {
        console.error('User ID is not available');
        this.isLoading = false;
      }
    }, error => {
      console.error('Error fetching user ID:', error);
      this.isLoading = false;
    });
  }
  

  filterByDate(date: Date | null): void {
    this.selectedDate = date;
    this.applyFilters();
  }

  filterByTiers(tier: string | null): void {
    this.selectedTier = tier;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const matchesDate = this.selectedDate ? new Date(transaction.date).toDateString() === this.selectedDate.toDateString() : true;
      const matchesTier = this.selectedTier ? this.tierMap[transaction.tiers] === this.selectedTier : true;
      return matchesDate && matchesTier;
    });
  }

  modifierTransaction(transaction: Transaction) {
    console.log('Modifier clicked for:', transaction);
  }

  supprimerTransaction(transaction: Transaction): void {
    if (transaction.id !== undefined) { // Check if transaction.id is not undefined
      const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
        width: '300px',
        data: {
          title: 'DELETE_CONFIRMATION_TRANSACTION',
          message: `Are you sure you want to delete transaction ${transaction.id}?`
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.transactionService.deleteTransaction(transaction.id as number).subscribe({ // Assert the type as number
            next: () => {
              this.transactions = this.transactions.filter(t => t.id !== transaction.id);
              this.loadTransactions();
              this.snackBar.open(this.translate.instant('TRANSACTION_DELETE_SUCCESS'), this.translate.instant('CLOSE'), { duration: 2000 });

            },
            error: (error) => {
              console.error('Error deleting transaction:', error);
            }
          });
        }
      });
    } else {
      console.error('Transaction ID is undefined. Cannot delete the transaction.');
    }
  }
  
}
