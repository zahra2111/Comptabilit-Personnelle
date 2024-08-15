import { Component, OnInit } from '@angular/core';
import { BudgetService } from '../../services/Budget/budget.service';
import { CategoryService } from '../../services/category/category.service';
import { Budget } from '../../services/Budget/budget';
import { Category } from '../../services/category/category';
import { UserService } from '../../services/User/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AddbudgetComponent } from '../addbudget/addbudget/addbudget.component';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { ConfirmDeleteBudgeComponent } from './confirm-delete-budge/confirm-delete-budge.component'; 
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.scss'],
  providers: [DatePipe]
})
export class BudgetComponent implements OnInit {
  budgets: Budget[] = [];
  filteredBudgets: Budget[] = [];
  categories: Category[] = [];
  errorMessage: string | null = null;
  isLoading = true;
  userID: number = 65;
  userIden: number | 0 = 0;

  private searchTerm: string = '';
  private selectedDate: Date | null = null;

  constructor(
    private datePipe: DatePipe,
    public dialog: MatDialog,
    private budgetService: BudgetService,
    private userService: UserService,
    private authService: AuthService,
    private categoryService: CategoryService,

    private snackBar: MatSnackBar,
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
    
    // Listen for language change and format dates accordingly
    this.translate.onLangChange.subscribe(() => {
      this.formatDates(); 
    });
  }

  formatDate(date: Date): string {
    const locale = this.translate.currentLang === 'fr' ? 'fr-FR' : 'en-US';
    return this.datePipe.transform(date, 'fullDate', undefined, locale) || '';
  }

  formatDates() {
    this.filteredBudgets = this.budgets.map(budget => ({
      ...budget,
      formattedDate: this.formatDate(new Date(budget.APartirDe))
    }));
  }
  searchQuery: string = '';
  filterBudgets(): void {
    if (this.searchQuery.trim()) {
      this.filteredBudgets = this.budgets.filter(budget =>
        budget.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        budget.duree.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredBudgets = this.budgets;
    }
  }
  
  filterByDate(date: Date | null) {
    this.selectedDate = date;
    const locale = this.translate.currentLang === 'fr' ? 'fr-FR' : 'en-US';
    const formattedSelectedDate = this.datePipe.transform(date, 'shortDate', undefined, locale);
  
    if (formattedSelectedDate) {
      this.filteredBudgets = this.budgets.filter(budget => {
        const budgetDate = new Date(budget.APartirDe);
        const formattedbudgetnDate = this.datePipe.transform(budgetDate, 'shortDate', undefined, locale);
        return formattedbudgetnDate === formattedSelectedDate;
      });
    } else {
      // If no date is selected, show all transactions
      this.filteredBudgets = [...this.budgets];
    }
  }
  
  
  onDateFilterChange(event: any) {
    this.selectedDate = event.value;
    this.filterBudgets();
  }


  openAddBudgetDialog(): void {
    const dialogRef = this.dialog.open(AddbudgetComponent, {
      width: '400px',
      data: { categories: this.categories }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const b = new Budget(
          parseFloat(result.montant),
          new Date(result.APartirDe),
          result.duree,
          result.category,
          `api/users/${this.userIden}`
        );
        this.budgetService.addBudget(b).subscribe(response => {
          console.log('Budget added successfully', response);
          this.snackBar.open(this.translate.instant('BUDGET_ADD_SUCCESS'), this.translate.instant('CLOSE'), { duration: 2000 });
          this.loadBudgets();
        }, error => {
          console.error('Error adding budget', error);
          this.snackBar.open(this.translate.instant('BUDGET_ADD_FAIL'), this.translate.instant('CLOSE'), { duration: 2000 });
        });
      }
    });
  }

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
          this.filteredBudgets = budgets; // Initially, display all budgets
          this.formatDates(); // Format dates after loading budgets
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
      this.errorMessage = 'Error fetching user ID. Please log in again.';
      this.isLoading = false;
    });
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    }, error => {
      console.error('Error fetching categories:', error);
    });
  }
}
