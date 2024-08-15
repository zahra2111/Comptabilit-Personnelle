import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../services/category/category';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/User/user.service';

@Component({
  selector: 'app-category',
  providers: [CategoryService],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @ViewChild('addCategoryDialog') addCategoryDialog!: TemplateRef<any>;
  newCategory: Category = new Category('', '');
  isLoading: boolean = false;
  errorMessage: string = '';
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  searchQuery: string = '';
  dialogRef: any;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog // Inject MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCurrentUserAndCategories();
  }

  loadCurrentUserAndCategories(): void {
    this.isLoading = true;

    this.authService.getCurrentUserId().subscribe(
      userId => {
        if (userId) {
          this.newCategory.usr = `api/users/${userId}`;
          this.loadCategories(userId);
        } else {
          this.handleError('User ID is not available. Please log in again.');
        }
      },
      error => {
        this.handleError('Error fetching user ID. Please try again later.');
      }
    );
  }

  loadCategories(userId: number): void {
    this.userService.getCategories(userId).subscribe(
      categories => {
        this.categories = categories;
        this.filteredCategories = categories;
        this.isLoading = false;
      },
      error => {
        this.handleError('Error fetching categories. Please try again later.');
      }
    );
  }

  addCategory(): void {
    if (this.newCategory.nom.trim()) {
      this.categoryService.addCategory(this.newCategory).subscribe(
        () => {
          this.loadCategories(this.newCategory.usr.split('/').pop() as unknown as number);
          this.newCategory.nom = '';
          this.closeDialog();
        },
        error => {
          this.handleError('Error adding category');
        }
      );
    } else {
      this.errorMessage = 'Category name cannot be empty';
    }
  }

  deleteCategory(categoryId: number | undefined): void {
    if (categoryId !== undefined) {
      this.categoryService.deleteCategory(categoryId).subscribe(
        () => {
          this.loadCategories(this.newCategory.usr.split('/').pop() as unknown as number);
        },
        error => {
          this.handleError('Error deleting category');
        }
      );
    } else {
      console.error('Category ID is undefined');
    }
  }

  filterCategories(): void {
    if (this.searchQuery.trim()) {
      this.filteredCategories = this.categories.filter(category =>
        category.nom.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredCategories = this.categories;
    }
  }

  private handleError(message: string): void {
    this.errorMessage = message;
    this.isLoading = false;
  }

  openAddCategoryDialog(): void {
    this.dialogRef = this.dialog.open(this.addCategoryDialog, {
      width: '300px'
    });
  }

  closeDialog(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
