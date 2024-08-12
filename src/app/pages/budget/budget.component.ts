import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/Budget/budget.service';
import { CategoryService } from '../../services/category/category.service';
import { Budget } from '../../services/Budget/budget';
import { Category } from '../../services/category/category';
import { UserService } from '../../services/User/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddbudgetComponent } from '../addbudget/addbudget/addbudget.component';
import { MatSnackBar } from '@angular/material/snack-bar'; // Optional for showing messages
import { ConfirmDeleteBudgeComponent } from './confirm-delete-budge/confirm-delete-budge.component'; // Adjust the path as necessary
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss']
})
export class BudgetComponent implements OnInit {
  budgets: Budget[] = [];
  categories: Category[] = [];
  errorMessage: string | null = null;
  isLoading = true;
  userID: number = 65;
  userIden: number| 0 = 0;

  constructor(
    public dialog: MatDialog,
    private budgetService: BudgetService,
    private userService: UserService,
    private authService: AuthService
    , private snackBar: MatSnackBar,
    private translate: TranslateService

  ) {}

  ngOnInit(): void {
    this.loadBudgets();
    this.loadCategories();
    this.authService.getCurrentUserId().subscribe(id => {
      this.userIden = id;
      console.log('User ID:', this.userIden);
    });
    this.translate.setDefaultLang('fr');

  }

  openAddBudgetDialog(): void {
    const dialogRef = this.dialog.open(AddbudgetComponent, {
      width: '400px',
      data: { categories: this.categories }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       
        const b = new Budget(
          parseFloat(result.montant), // Convert montant to float
          new Date(result.APartirDe), // Convert APartirDe to Date
          result.duree,
          result.category,
          `api/users/${this.userIden}` // Construct the IRI for user reference
        );      
        
              // Add new bank account
              this.budgetService.addBudget(b)
                .subscribe(response => {
                  console.log('budget added successfully', response);
                  this.snackBar.open(this.translate.instant('BUDGET_ADD_SUCCESS') || 'Default message', this.translate.instant('CLOSE'), { duration: 2000 });

                  this.loadBudgets();
                }, error => {
                  this.snackBar.open(this.translate.instant('BUDGET_ADD_FAIL'), this.translate.instant('CLOSE'), { duration: 2000 });

                  console.error('Error adding budget', error);
                });
            }
      
          
      });}
      deleteBudget(budgetId: number | undefined): void {
        if (budgetId === undefined) {
          console.error(this.translate.instant('ERROR_BUDGET_ID_UNDEFINED'));
          return;
        }
      
        const dialogRef = this.dialog.open(ConfirmDeleteBudgeComponent, {
          width: '300px'
        });
      
        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.budgetService.deleteBudget(budgetId).subscribe(
              () => {
                this.budgets = this.budgets.filter(budget => budget.id !== budgetId);
                this.snackBar.open(this.translate.instant('BUDGET_DELETE_SUCCESS'), this.translate.instant('CLOSE'), { duration: 2000 });
                this.loadBudgets();

              },
              error => {
                console.error(this.translate.instant('ERROR_DELETING_BUDGET'), error);

                this.snackBar.open(this.translate.instant('ERROR_DELETING_BUDGET'), this.translate.instant('CLOSE'), { duration: 2000 });
              }
            );
          }
        });
      }
      
    
      
  loadBudgets(): void {
    this.isLoading = true;
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.userService.getBudgets(userId).subscribe(budgets => {
          this.budgets = budgets;
          this.isLoading = false;
        }, error => {
          console.error('Error fetching budgets:', error);
          this.errorMessage = 'Error fetching budgets. Please try again later.';
          this.isLoading = false;
        });
      } else {
        console.error('User ID is not available');
        this.errorMessage = 'User ID is not available. Please log in again.';
        this.isLoading = false;
      }
    }, error => {
      console.error('Error fetching user ID:', error);
      this.errorMessage = 'Error fetching user ID. Please try again later.';
      this.isLoading = false;
    });
  }

  loadCategories(): void {
    this.isLoading = true;
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.userService.getCategories(userId).subscribe(categories => {
          this.categories = categories;
          this.isLoading = false;
        }, error => {
          console.error('Error fetching categories:', error);
          this.errorMessage = 'Error fetching categories. Please try again later.';
          this.isLoading = false;
        });
      } else {
        console.error('User ID is not available');
        this.errorMessage = 'User ID is not available. Please log in again.';
        this.isLoading = false;
      }
    }, error => {
      console.error('Error fetching user ID:', error);
      this.errorMessage = 'Error fetching user ID. Please try again later.';
      this.isLoading = false;
    });
  }
}
