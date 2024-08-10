import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category/category.service'; // Import the CategoryService
import { Category } from '../../services/category/category'; // Import the Category class
import { AuthService } from '../../services/auth/auth.service'; // Import AuthService to get current user ID
import { UserService } from '../../services/User/user.service'; // Import AuthService to get current user ID

@Component({
  selector: 'app-category',
  providers: [CategoryService],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  newCategory: Category = new Category('', ''); // Initialize with empty values
  isLoading: boolean = false;
  errorMessage: string = '';
  categories: Category[] = [];
  loading: boolean = false;
  error: string | null = null;
  userId: number | null = null;

  constructor(
    private categoryService: CategoryService,
    private authService: AuthService ,// Inject AuthService to get current user ID
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.authService.getCurrentUserId().subscribe(userId => {
      if (userId) {
        this.userId = userId; // Set the user ID
        this.newCategory.usr = `api/users/${userId}`; // Set the user IRI for newCategory
        this.loadCategories(); // Load categories once userId is set
      } else {
        console.error('User ID is not available');
        this.errorMessage = 'User ID is not available. Please log in again.';
      }
    });
    this.loadCategories();
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

  addCategory(): void {
    if (this.newCategory.nom.trim()) {
      this.categoryService.addCategory(this.newCategory).subscribe(
        () => {
          this.loadCategories(); // Reload categories after adding
          this.newCategory.nom = ''; // Reset the input field
        },
        (error) => {
          this.errorMessage = 'Error adding category';
          console.error(error);
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
          this.loadCategories(); // Reload categories after deletion
        },
        (error) => {
          this.errorMessage = 'Error deleting category';
          console.error(error);
        }
      );
    } else {
      console.error('Category ID is undefined');
    }
  }
}
