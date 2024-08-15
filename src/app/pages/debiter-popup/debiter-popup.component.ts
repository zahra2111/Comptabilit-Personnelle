import { Component, OnInit, Input, EventEmitter, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TierService } from '../../services/tier/tier.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth/auth.service';
import { TransactionService } from '../../services/transaction/transaction.service';
import { CompteBancaireService } from '../../services/CompteBancaire/compte-bancaire.service';
import { UserService } from '../../services/User/user.service';
import { ModelService } from '../../services/model/model.service';
import { Tier } from '../../services/tier/Tier';
import { BankAccount } from '../../services/CompteBancaire/compteBancaire';
import { Model } from '../../services/model/Model';

@Component({
  selector: 'app-debiter-popup',
  templateUrl: './debiter-popup.component.html',
  styleUrls: ['./debiter-popup.component.scss']
})
export class DebiterPopupComponent implements OnInit {
  @Input() preSelectedTierId: number | null = null;
  @Input() preSelectedCompteId: number | null = null;
  @Input() preSelectedUserId: number | 0 = 0;
  @Input() isEditMode: boolean = false;
  @Input() transactionId: number | null = null;
  @Input() model: Model | null = null;
  @Output() transactionAdded = new EventEmitter<void>();

  debitForm: FormGroup;
  tiers: Tier[] = [];
  comptes: BankAccount[] = [];
  models: Model[] = [];
  selectedModel: Model | null = null;
  selectedTierId: number | null = null;
  selectedCompteId: number | null = null;
  userIden: number | 0 = 0;

  constructor(
    private fb: FormBuilder,
    private tierService: TierService,
    private authService: AuthService,
    private transactionService: TransactionService,
    private compteBancaireService: CompteBancaireService,
    private modelService: ModelService,
    private snackBar: MatSnackBar,
    private userService: UserService,
    public dialogRef: MatDialogRef<DebiterPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.debitForm = this.fb.group({
      date: [''],
      description: [''],
      amount: [''],
      tiers: [''],
      compte: ['']
    });
  }
  ngOnInit(): void {
    this.loadModels();
    this.loadTiers();
    this.loadComptes();
    
    if (this.data) {
      this.isEditMode = this.data.isEditMode || false;
      this.transactionId = this.data.transactionId || null;
    } else {
      this.isEditMode = false;
      this.transactionId = null;
    }
  
    if (this.model) {
      this.populateFormWithModel(this.model);
    }
  
    if (this.isEditMode && this.transactionId !== null) {
      this.loadTransactionData(this.transactionId);
    }
  
    if (!this.userIden) {
      this.authService.getCurrentUserId().subscribe(id => {
        this.userIden = id;
      });
    }
  }
  
  loadModels(): void {
    this.modelService.getModels().subscribe(models => {
      this.models = models;
    }, error => {
      console.error('Error loading models', error);
    });
  }
  onModelSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const modelId = parseInt(selectElement.value, 10);
    if (modelId) {
      const model = this.models.find(m => m.id === modelId);
      if (model) {
        this.useModel(model);
      }
    }
  }
  useModel(model: Model): void {
    this.selectedModel = model;
    this.populateFormWithModel(model);
  }
  populateFormWithModel(model: Model): void {
    this.debitForm.patchValue({
      description: model.type || '',
      amount: model.montant || '',
      tiers: model.tiers || '',
      compte: model.compte || ''
    });
  }

  loadTransactionData(id: number): void {
    this.transactionService.getTransactionDetails(id).subscribe(transaction => {
      this.populateForm(transaction);
    });
  }

  populateForm(transaction: any): void {
    const formattedDate = this.formatDate(transaction.date);
    this.debitForm.patchValue({
      date: formattedDate,
      description: transaction.Notes,
      amount: transaction.amount,
      tiers: transaction.tiers,
      compte: transaction.Compte
    });
    this.selectedTierId = transaction.tiers ? parseInt(transaction.tiers.split('/').pop()!, 10) : null;
    this.selectedCompteId = transaction.Compte ? parseInt(transaction.Compte.split('/').pop()!, 10) : null;
  }

  loadTiers(): void {
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.tierService.getTiers().subscribe(tiers => {
          this.tiers = tiers.map((t: any) => new Tier(t.nom, t.adresse, t.commentaire, t.usr, t.transactions, t.id));
        }, error => {
          console.error('Error fetching tiers:', error);
          this.snackBar.open('Error fetching tiers', 'Close', { duration: 2000 });
        });
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
          this.comptes = budgets.map((b: any) => new BankAccount(b.nom, b.solde, b.devise, b.transactions, b.user, b.id));
        }, error => {
          console.error('Error fetching accounts:', error);
          this.snackBar.open('Error fetching accounts', 'Close', { duration: 2000 });
        });
      }
    }, error => {
      console.error('Error fetching user ID:', error);
      this.snackBar.open('Error fetching user ID. Please try again later.', 'Close', { duration: 2000 });
    });
  }

  onTierChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedTierId = parseInt(selectElement.value, 10);
  }

  onCompteChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedCompteId = parseInt(selectElement.value, 10);
  }

  onSubmit(): void {
    const currentDate = new Date();

 
    if (this.debitForm.valid) {
      const formValue = this.debitForm.value;
      const transaction = {
        type: "debit",
        amount:  parseFloat(formValue.montant),
        Notes: formValue.description,
        date:currentDate,
        usr:  `api/users/${this.userIden}`,
        tiers: `api/tiers/${this.selectedTierId}`,
        Compte: `api/banks/${this.selectedTierId}`

      };
      
      if (this.isEditMode && this.transactionId !== null) {
        this.transactionService.modifyTransaction(this.transactionId, transaction).subscribe(() => {
          this.snackBar.open('Transaction updated successfully!', 'Close', { duration: 2000 });
          this.dialogRef.close();
        }, error => {
          console.error('Error updating transaction:', error);
          this.snackBar.open('Error updating transaction', 'Close', { duration: 2000 });
        });
      } else {
        this.transactionService.addTransaction(transaction).subscribe(() => {
          this.snackBar.open('Transaction added successfully!', 'Close', { duration: 2000 });
          this.dialogRef.close();
        }, error => {
          console.error('Error adding transaction:', error);
          this.snackBar.open('Error adding transaction', 'Close', { duration: 2000 });
        });
      }
    } else {
      this.snackBar.open('Please fill out all required fields', 'Close', { duration: 2000 });
    }
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  }

  closePopup(): void {
    this.dialogRef.close();
  }
}
