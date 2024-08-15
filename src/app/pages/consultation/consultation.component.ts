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
import { forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as TablerIcons from 'angular-tabler-icons/icons';
import { DatePipe, NgIf } from '@angular/common';
import { ModelService } from '../../services/model/model.service';
import { Model } from '../../services/model/Model';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.scss'],
  providers: [DatePipe]

})
export class AppConsultationComponent implements OnInit {
  displayedColumns: string[] = ['n°', 'date', 'description','Compte', 'Montant', 'tiers', 'actions'];
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
  searchQuery: string = '';
  models: Model[] = [];
  selectedModel: Model | null = null;

  constructor(
    private datePipe: DatePipe,
    private modelService: ModelService, 
    private translate: TranslateService,
    public dialog: MatDialog,
    private authService: AuthService,
    private transactionService: TransactionService,
    private userService: UserService,
    private compteService: CompteBancaireService,
    private tierService: TierService,
    private snackBar: MatSnackBar,

  ) { }

  date: Date = new Date(12,2,2024);
  formattedDate: string | null=null;

  ngOnInit(): void {

    this.translate.onLangChange.subscribe(() => {
      this.formatDates(); // Update all transaction dates when language changes
    });
    this.translate.setDefaultLang('fr');

    this.loadTransactions();
    this.authService.getCurrentUserId().subscribe(id => {
      this.userIden = id;
      console.log('User ID:', this.userIden);
    });
    this.translate.setDefaultLang('fr');
  }
 
  useModel(model: Model): void {
    this.selectedModel = model;
    const dialogRef = this.dialog.open(DebiterPopupComponent, {
      width: '400px',
      data: { model: model } // Pass the selected model data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const transaction = new Transaction(
          model.description,
          model.montant,
          model.type,
          result.date, // The user can modify the date or keep it the same
          `api/users/${this.userIden}`,
          model.compte,
          model.tiers
        );

        this.transactionService.addTransaction(transaction)
          .subscribe(response => {
            console.log('Transaction added successfully from model', response);
            this.loadTransactions();
          }, error => {
            console.error('Error adding transaction from model', error);
          });
      }
    });
  }
  changeLanguage(lang: string) {
    this.translate.use(lang);
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
  formatDate(date: Date): string {
    const locale = this.translate.currentLang === 'fr' ? 'fr-FR' : 'en-US';
    return this.datePipe.transform(date, 'fullDate', undefined, locale) || '';
  }
  formatDates() {
    this.transactions = this.transactions.map(transaction => ({
      ...transaction,
      formattedDate: this.formatDate(new Date(transaction.date))
    }));
    this.filteredTransactions = [...this.transactions]; // Update filtered transactions if needed
  }
  loadTransactions(): void {
    this.isLoading = true; // Start the spinner

    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.userService.getTransactions(userId).subscribe(transactions => {
          this.transactions = transactions;
          this.filteredTransactions = transactions;

          // Create an array of observables for fetching bank details
          const bankDetailsObservables = transactions.map(transaction => {
            const bankIri = transaction.Compte;
            if (bankIri) {
              return this.compteService.getBankByIri(bankIri).pipe(
                map(bankDetails => {
                  transaction.Compte = bankDetails.nom; // Replace IRI with bank name
                  return transaction;
                }),
                catchError(error => {
                  console.error('Error fetching bank name:', error);
                  transaction.Compte = 'Unknown'; // Fallback in case of error
                  return of(transaction); // Continue with other transactions
                })
              );
            } else {
              transaction.Compte = 'Unknown'; // Handle case where bank IRI is not available
              return of(transaction);
            }
          });

          // Use forkJoin to fetch all bank details in parallel
          forkJoin(bankDetailsObservables).subscribe(
            updatedTransactions => {
              this.transactions = updatedTransactions;
              this.formatDates(); // Format dates after fetching transactions
              this.isLoading = false; // Stop the spinner
            },
            error => {
              console.error('Error fetching bank details:', error);
              this.snackBar.open('Error fetching bank details', 'Close', { duration: 2000 });
              this.isLoading = false; // Stop the spinner
            }
          );

          this.fetchTierDetails(transactions); // Fetch tier details after transactions
        },
        error => {
          console.error('Error fetching transactions:', error);
          this.snackBar.open('Error fetching transactions', 'Close', { duration: 2000 });
          this.isLoading = false; // Stop the spinner
        });
      } else {
        console.error('User ID is not available');
        this.isLoading = false; // Stop the spinner
      }
    },
    error => {
      console.error('Error fetching user ID:', error);
      this.isLoading = false; // Stop the spinner
    });
  }
  filterByDate(date: Date | null) {
    this.selectedDate = date;
    const locale = this.translate.currentLang === 'fr' ? 'fr-FR' : 'en-US';
    const formattedSelectedDate = this.datePipe.transform(date, 'shortDate', undefined, locale);
    
    if (formattedSelectedDate) {
      this.filteredTransactions = this.transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const formattedTransactionDate = this.datePipe.transform(transactionDate, 'shortDate', undefined, locale);
        return formattedTransactionDate === formattedSelectedDate;
      });
    } else {
      // If no date is selected, show all transactions
      this.filteredTransactions = [...this.transactions];
    }
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
  modifierTransaction(transaction: Transaction): void {
    
    if(transaction.type=="debit"){
      const dialogRef = this.dialog.open(DebiterPopupComponent, {
        width: '400px',
        data: {
          transaction: transaction,
          isEditMode: true, // Ensure this is true for editing
          transactionId: transaction.id // Ensure this is the correct ID
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const updatedTransaction = {
            ...transaction, // Preserve the existing fields
            amount: result.amount,
            notes: result.Notes,
            date: result.date,
            Compte: `api/banks/${result.bankID}`,
            tiers: `api/tiers/${result.tierID}`
          };
          if (transaction.id !== undefined) {
          this.transactionService.modifyTransaction(transaction.id,updatedTransaction).subscribe(
            response => {
              this.loadTransactions(); // Reload the transactions list
              this.snackBar.open(this.translate.instant('TRANSACTION_UPDATE_SUCCESS'), this.translate.instant('CLOSE'), { duration: 2000 });
  
            },
            error => {
  
              console.error('Error updating transaction', error);
              this.snackBar.open(this.translate.instant('TRANSACTION_UPDATE_FAIL'), this.translate.instant('CLOSE'), { duration: 2000 });
  
            }
          );
        }}
      });
    }
    else {
      const dialogRef = this.dialog.open(CrediterPopupComponent, {
        width: '400px',
        data: {  transaction: transaction,
          isEditMode: true, // Ensure this is true for editing
          transactionId: transaction.id }// Ensure this is the correct ID
      });
    
   
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedTransaction = {
          ...transaction, // Preserve the existing fields
          amount: result.amount,
          notes: result.Notes,
          date: result.date,
          Compte: `api/banks/${result.bankID}`,
          tiers: `api/tiers/${result.tierID}`
        };
        if (transaction.id !== undefined) {
        this.transactionService.modifyTransaction(transaction.id,updatedTransaction).subscribe(
          response => {
            console.log('Transaction updated successfully', response);
            this.loadTransactions();

            this.snackBar.open(this.translate.instant('TRANSACTION_UPDATE_SUCCESS'), this.translate.instant('CLOSE'), { duration: 2000 });

          },
          error => {

            console.error('Error updating transaction', error);
            this.snackBar.open(this.translate.instant('TRANSACTION_UPDATE_FAIL'), this.translate.instant('CLOSE'), { duration: 2000 });

          }
        );
      }}
    });}
   
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
  search(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredTransactions = this.transactions.filter(transaction => {
      return transaction.Notes.toLowerCase().includes(query) ||
             (transaction.Compte && transaction.Compte.toLowerCase().includes(query)) ||
             (this.tierMap[transaction.tiers] && this.tierMap[transaction.tiers].toLowerCase().includes(query));
    });
  }
  
}
