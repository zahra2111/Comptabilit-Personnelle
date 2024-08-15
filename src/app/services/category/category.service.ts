import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { switchMap, catchError } from 'rxjs/operators';
import { Category } from './category';
import { User } from '../User/user';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://127.0.0.1:8000/api/categories';
  private userApiUrl = 'http://127.0.0.1:8000/api/current_user'; // URL to fetch the current user

  constructor(private http: HttpClient, private authService: AuthService) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl); // Fetch all categories
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category); // Add a new category
  }

  getCategoryDetails(categoryId: number): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.get<any>(url);
  }
  deleteCategory(categoryId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${categoryId}`);
  }

  modifyCategory(categoryId: number, categoryData: Category): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.put<any>(url, categoryData);
  }
  
  getCategoriesForCurrentUser(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/current_user`); // Adjust endpoint as needed
  }
  getCategoryById(categoryId: number): Observable<any> {
    const url = `${this.apiUrl}/${categoryId}`;
    return this.http.get<any>(url);
  }
}
