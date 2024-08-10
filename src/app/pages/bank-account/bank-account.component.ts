import { Component, OnInit } from '@angular/core';
import { CompteBancaireService } from '../../services/CompteBancaire/compte-bancaire.service';
import { BankAccount } from '../../services/CompteBancaire/compteBancaire';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/User/user.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.css']
})
export class BankAccountComponent implements OnInit {

  userInfo: any = {};

  comptes: BankAccount[] = [];
  showPopup: boolean = false;
  editingBankAccount: BankAccount | null = null;
  userID: number = 0;
  userId: number = 65;

  constructor(private translate: TranslateService,private compteBancaireService: CompteBancaireService,private authService: AuthService,private userService: UserService) {}
  searchQuery: string = '';

  // Method to filter bank accounts based on search query
  filteredComptes() {
    if (!this.searchQuery) {
      return this.comptes;
    }
    const query = this.searchQuery.toLowerCase();
    return this.comptes.filter(compte =>
      compte.nom.toLowerCase().includes(query) ||
      compte.type.toLowerCase().includes(query)
    );
  }
  ngOnInit(): void {
    this.translate.setDefaultLang('en');

    this.userService.getBanks(this.userId).subscribe(
      bankAccounts => {
        this.comptes = bankAccounts;
      },
      error => {
        console.error('Error fetching bank accounts', error);
      }
    );
  }

  getComptes(): void {
    this.compteBancaireService.getCompteBancaires().subscribe(
      (response) => {
        console.log('API Response:', response);
        this.comptes = response;
      },
      (error) => {
        console.error('Error fetching bank accounts:', error);
      }
    );
  }

  openPopup(bankAccount?: BankAccount): void {
    this.editingBankAccount = bankAccount ? { ...bankAccount } : null;
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
    this.editingBankAccount = null;
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
    const bank = new BankAccount(form.value.nom, parseFloat(form.value.initialSum), form.value.type, `api/users/${this.userID}`);

      if (this.editingBankAccount) {
        // Update existing bank account
        this.compteBancaireService.modifyCompteBancaire(this.editingBankAccount.id!, bank)
          .subscribe(response => {
            console.log('Bank account updated successfully', response);
            this.getComptes(); // Refresh the list
            this.closePopup(); // Close the popup
          }, error => {
            console.error('Error updating bank account', error);
          });
      } else {
        // Add new bank account
        this.compteBancaireService.addCompteBancaire(bank)
          .subscribe(response => {
            console.log('Bank account added successfully', response);
            this.getComptes(); // Refresh the list
            this.closePopup(); // Close the popup
          }, error => {
            console.error('Error adding bank account', error);
          });
      }

      form.resetForm();
    }
  }

  deleteBankAccount(id: number): void {
    if (confirm('Are you sure you want to delete this bank account?')) {
      this.compteBancaireService.deleteCompteBancaire(id)
        .subscribe(response => {
          console.log('Bank account deleted successfully', response);
          this.getComptes(); // Refresh the list
        }, error => {
          console.error('Error deleting bank account', error);
        });
    }
  }
}
