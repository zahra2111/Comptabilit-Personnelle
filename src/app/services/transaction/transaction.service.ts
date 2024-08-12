import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './Transaction'; // Import your Transaction model
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private apiUrl = 'http://127.0.0.1:8000/api/transactions'; // Adjust API URL for transactions
  private userApiUrl = 'http://127.0.0.1:8000/api/current_user'; // URL to fetch the current user

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Fetch all transactions
  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.apiUrl);
  }

  // Add a new transaction
  addTransaction(transaction: Transaction): Observable<Transaction> {
    return this.http.post<Transaction>(this.apiUrl, transaction);
  }

  // Get details of a specific transaction
  getTransactionDetails(transactionId: number): Observable<Transaction> {
    const url = `${this.apiUrl}/${transactionId}`;
    return this.http.get<Transaction>(url);
  }

  // Delete a transaction
  deleteTransaction(transactionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${transactionId}`);
  }

  // Modify an existing transaction
  modifyTransaction(transactionId: number, transactionData: Transaction): Observable<Transaction> {
    const url = `${this.apiUrl}/${transactionId}`;
    return this.http.put<Transaction>(url, transactionData);
  }

  getTransactionsForCurrentUser(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/current_user`); // Ensure this matches your Symfony route
  }

 
}
