import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , forkJoin,of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Budget } from '../Budget/budget';
import { map, catchError } from 'rxjs/operators';
import {  throwError, } from 'rxjs';

import { User } from './user';
import { Transaction } from '../transaction/Transaction';

import { BankAccount } from '../CompteBancaire/compteBancaire';
import { Category } from '../category/category';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/users';
  private apiUrl2 = 'http://127.0.0.1:8000/api/current_user'; // Endpoint to get current user


  getCurrentUser(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  constructor(private http: HttpClient) { }
  getCurrentUserId(): Observable<number> {
    return this.getCurrentUser().pipe(
      map(user => {
        console.log('Fetched user:', user); // Log the user response
        return user.id ?? -1;
      }),
      catchError(error => {
        console.error('Error fetching current user ID:', error);
        return of(-1); // Return a default value or handle the error as needed
      })
    );
  }

  getUsers(page: number = 1): Observable<any> {
    const url = `${this.apiUrl}?page=${page}`;
    console.log(url);
    return this.http.get<any>(url);
  }
  httpOptions = { headers: new HttpHeaders({ })}
  private bankApiUrl = 'http://127.0.0.1:8000';
  addUser(user: User): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post<any>(this.apiUrl, body, { headers });
  }
  
  getCategories(userId: number): Observable<Category[]> {
    return this.http.get<{ categories: string[] }>(`${this.apiUrl}/${userId}`).pipe(
      switchMap(response => {
        console.log('Categories response:', response); // Log response to check structure
        const categoryRequests = response.categories.map(url => {
          const categoryUrl = url.startsWith('/api') ? `${this.bankApiUrl}${url}` : `${this.bankApiUrl}/${url}`;
          console.log(`Fetching category from: ${categoryUrl}`);
          return this.http.get<Category>(categoryUrl);
        });
        return forkJoin(categoryRequests);
      })
    );
  }
  getBanks(userId: number): Observable<BankAccount[]> {
    return this.http.get<{ bankAccounts: string[] }>(`${this.apiUrl}/${userId}`).pipe(
      switchMap(response => {
        const bankAccountRequests = response.bankAccounts.map(url => {
          const bankAccountUrl = url.startsWith('/api') ? `${this.bankApiUrl}${url}` : `${this.bankApiUrl}/${url}`;
          console.log(`Fetching bank account from: ${bankAccountUrl}`);
          return this.http.get<BankAccount>(bankAccountUrl);
        });
        return forkJoin(bankAccountRequests);
      })
    );
  }
  getBudgets(userId: number): Observable<Budget[]> {
    return this.http.get<{ budgets: string[] }>(`${this.apiUrl}/${userId}`).pipe(
      switchMap(response => {
        const budgetRequests = response.budgets.map(url => {
          const budgetUrl = url.startsWith('/api') ? `${this.bankApiUrl}${url}` : `${this.bankApiUrl}/${url}`;
          console.log(`Fetching budget from: ${budgetUrl}`);
          return this.http.get<Budget>(budgetUrl);
        });
        return forkJoin(budgetRequests);
      })
    );
  }
  getTransactions(userId: number): Observable<Transaction[]> {
    return this.http.get<{ transactions: string[] }>(`${this.apiUrl}/${userId}`).pipe(
      switchMap(response => {
        const budgetRequests = response.transactions.map(url => {
          const budgetUrl = url.startsWith('/api') ? `${this.bankApiUrl}${url}` : `${this.bankApiUrl}/${url}`;
          console.log(`Fetching transactions from: ${budgetUrl}`);
          return this.http.get<Transaction>(budgetUrl);
        });
        return forkJoin(budgetRequests);
      })
    );
  }
  
  getUserDetails(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url);
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<any>(url);
  }

  modifyUser(userId: number, userData: User): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<any>(url, userData);
  }

  getUserById(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url);
  }
}
