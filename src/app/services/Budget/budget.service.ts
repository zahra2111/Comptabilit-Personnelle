import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { Budget } from './budget';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../User/user';
import { switchMap, catchError } from 'rxjs/operators';
import { UserService } from '../../services/User/user.service';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private apiUrl = 'http://127.0.0.1:8000/api/budgets'; // Replace with your actual API endpoint
  private userApiUrl = 'http://127.0.0.1:8000/api/current_user'; // URL to fetch the current user

  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService) { }
 

  getCurrentUserBudgets(): Observable<Budget[]> {
    return this.userService.getCurrentUserId().pipe(
      switchMap(userId => {
        if (userId > 0) {
          // Construct the URL to fetch the current user's details
          const userUrl = `${this.userApiUrl}/${userId}`;
          return this.http.get<{ budgets: string[] }>(userUrl).pipe(
            switchMap(response => {
              const budgetRequests = response.budgets.map(url => {
                // Construct the full URL for each budget
                const budgetUrl = url.startsWith('/api') ? `${this.apiUrl}${url}` : `${this.apiUrl}/${url}`;
                return this.http.get<Budget>(budgetUrl);
              });
              return forkJoin(budgetRequests);
            }),
            catchError(error => {
              console.error('Error fetching user budgets:', error);
              return of([]); // Return an empty array in case of error
            })
          );
        } else {
          return of([]); // Return an empty array if userId is invalid
        }
      }),
      catchError(error => {
        console.error('Error retrieving current user ID:', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }
   // Define httpOptions here
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  addBudget(bankAccount: Budget): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(bankAccount);

    return this.http.post<Budget>(this.apiUrl, body, { headers }).pipe(
      switchMap(response => {
        // Extract the URL of the newly created bank account
        const newAccountUrl = `${this.apiUrl}/${response.id}`;
        
        return this.authService.getCurrentUser().pipe(
          switchMap((user: User) => {
            if (user && user.budgets) {
              user.budgets.push(newAccountUrl); // Add the URL of the new bank account to the user's banks collection
              return this.http.put<User>(`${this.userApiUrl}/${user.id}`, user, { headers });
            } else {
              console.error('User or user.budgets is undefined');
              return of(null); // Handle the case where user or user.banks is undefined
            }
          })
        );
      }),
      catchError(error => {
        console.error('Error adding budget:', error);
        return of(null); // Handle errors and return a default value
      })
    );
  }

  
  getBudgetDetails(budgetId: number): Observable<any> {
    const url = `${this.apiUrl}/${budgetId}`;
    return this.http.get<any>(url);
  }

  deleteBudget(budgetId: number): Observable<any> {
    const url = `${this.apiUrl}/${budgetId}`;
    return this.http.delete<any>(url);
  }

  modifyBudget(budgetId: number, budgetData: Budget): Observable<any> {
    const url = `${this.apiUrl}/${budgetId}`;
    return this.http.put<any>(url, budgetData);
  }

  getBudgetById(budgetId: number): Observable<any> {
    const url = `${this.apiUrl}/${budgetId}`;
    return this.http.get<any>(url);
  }
}
