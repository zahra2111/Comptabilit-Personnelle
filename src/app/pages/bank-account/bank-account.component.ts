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
  userId: number| 0 = 0;

  constructor(private translate: TranslateService,private compteBancaireService: CompteBancaireService,private authService: AuthService,private userService: UserService)
   {
 
   }
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

    this.getComptes();
    this.authService.getCurrentUserId().subscribe(id => {
      this.userId = id;
      console.log('User ID:', this.userId);
    });
  }

  getComptes(): void {
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
    const bank = new BankAccount(form.value.nom, parseFloat(form.value.initialSum), form.value.type, `api/users/${this.userId}`);

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
