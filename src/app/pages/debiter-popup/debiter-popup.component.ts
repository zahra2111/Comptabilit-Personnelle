import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TierService } from '../../services/tier/tier.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';
import { TransactionService } from '../../services/transaction/transaction.service';
import { CompteBancaireService } from '../../services/CompteBancaire/compte-bancaire.service';
import { Tier } from '../../services/tier/Tier';
import { BankAccount } from '../../services/CompteBancaire/compteBancaire';
import { UserService } from '../../services/User/user.service';
import {  EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-debiter-popup',
  templateUrl: './debiter-popup.component.html',
  styleUrls: ['./debiter-popup.component.scss']
})
export class DebiterPopupComponent implements OnInit {
  @Output() transactionAdded = new EventEmitter<void>();

  debitForm: FormGroup;
  tiers: Tier[] = []; // Array to hold tier data
  comptes: BankAccount[] = []; // Array to hold compte data
  selectedTierId: number | null = null;
  selectedCompteId: number | null = null;
  userIden: number | 0 = 0;

  constructor(
    private fb: FormBuilder,
    private tierService: TierService,
    private authService: AuthService,
    private transactionService: TransactionService,
    private compteBancaireService: CompteBancaireService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    public dialogRef: MatDialogRef<DebiterPopupComponent> // Used for dialog control
  ) {
    this.debitForm = this.fb.group({
      date: [''],
      description: [''],
      mode: [''],
      tiers: [''],
      compte: [''],
      amount: ['']
    });
  }

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe(id => {
      this.userIden = id;
      console.log('User ID:', this.userIden);
    });
    this.loadTiers();
    this.loadComptes(); // Load comptes data
  }

  loadTiers(): void {
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.tierService.getTiers().subscribe(tiers => {
          // Map the API response to Tier instances
          this.tiers = tiers.map((t: any) => new Tier(
            t.nom,
            t.adresse,
            t.commentaire,
            t.usr,
            t.transactions,
            t.id
          ));
        }, error => {
          console.error('Error fetching tiers:', error);
          this.snackBar.open('Error fetching tiers', 'Close', { duration: 2000 });
        });
      } else {
        console.error('User ID is not available');
        this.snackBar.open('User ID is not available. Please log in again.', 'Close', { duration: 2000 });
      }
    }, error => {
      console.error('Error fetching user ID:', error);
      this.snackBar.open('Error fetching user ID. Please try again later.', 'Close', { duration: 2000 });
    });
  }
  loadComptes(): void {
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.userService.getBanks(userId).subscribe(budgets => {
          this.comptes = budgets;
        }, error => {
          console.error('Error fetching budgets:', error);
     
        });
      } else {
        console.error('User ID is not available');
  
      }
    }, error => {
      console.error('Error fetching user ID:', error);
  
    });
  }


  onSubmit(): void {
    if (this.selectedTierId !== null && this.selectedCompteId !== null) {
      const formValue = this.debitForm.value;
      const tierId = this.selectedTierId;
      const compteId = this.selectedCompteId;
      // Prepare the transaction data
      const transactionData = {
        date: formValue.date,
        Notes: formValue.description,
        amount: parseFloat(formValue.amount),
        type: 'debit', // Assuming 'debit' as the type of transaction
        tiers: `api/tiers/${tierId}`,
        usr: `api/users/${this.userIden}`,
        Compte: `api/banks/${compteId}` // Assuming you have an endpoint for comptes
      };

      // Call the service to add the transaction
      this.transactionService.addTransaction(transactionData).subscribe(
        response => {
          console.log('Transaction added successfully', response);
          this.snackBar.open('Transaction added successfully', 'Close', { duration: 2000 });
          this.transactionAdded.emit(); // Emit event after successful addition

          this.closePopup(); // Close the popup after successful submission
        },
        error => {
          console.error('Error adding transaction', error);
          this.snackBar.open('Error adding transaction', 'Close', { duration: 2000 });
        }
      );
    } else {
      this.snackBar.open('Please select a tier and a compte', 'Close', { duration: 2000 });
    }
  }

  closePopup(): void {
    this.dialogRef.close();
  }

  onTierChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedTierId = target.value ? parseInt(target.value, 10) : null;
  }

  onCompteChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedCompteId = target.value ? parseInt(target.value, 10) : null;
  }
}