import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable  ,of, forkJoin } from 'rxjs';
import { BankAccount } from './compteBancaire';
import { AuthService } from '../../services/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import {User} from '../User/user'
import { catchError } from 'rxjs/operators'; // Import 'catchError' and 'switchMap' from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CompteBancaireService {
  private apiUrl = 'http://127.0.0.1:8000/api/banks';
  private userApiUrl = 'http://127.0.0.1:8000/api/current_user'; // URL to fetch the current user

  userInfo: any = {};
  constructor(private http: HttpClient, private authService: AuthService) { }
  
  getCompteBancaires(): Observable<any> {
    return this.authService.getCurrentUser().pipe(
      switchMap((user: User) => {
        console.log('Current user:', user); // Debug log
        if (user && user.banks && user.banks.length > 0) {
          // Create an array of Observables to fetch each bank account
          const accountRequests = user.banks.map((accountUrl: string) => 
            this.http.get<BankAccount>(accountUrl)
          );
          // Fetch all bank accounts and return as a single Observable
          return forkJoin(accountRequests);
        } else {
          // Return an empty array if no bank accounts are found
          console.log('No bank accounts found for user.'); // Debug log
          return of([]);
        }
      }),
      catchError(error => {
        console.error('Error fetching bank accounts:', error);
        return of([]);
      })
    );
  }
  httpOptions = { headers: new HttpHeaders({ })}
  addCompteBancaire(bankAccount: BankAccount): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = JSON.stringify(bankAccount);

    return this.http.post<BankAccount>(this.apiUrl, body, { headers }).pipe(
      switchMap(response => {
        // Extract the URL of the newly created bank account
        const newAccountUrl = `${this.apiUrl}/${response.id}`;
        
        return this.authService.getCurrentUser().pipe(
          switchMap((user: User) => {
            if (user && user.banks) {
              user.banks.push(newAccountUrl); // Add the URL of the new bank account to the user's banks collection
              return this.http.put<User>(`${this.userApiUrl}/${user.id}`, user, { headers });
            } else {
              console.error('User or user.banks is undefined');
              return of(null); // Handle the case where user or user.banks is undefined
            }
          })
        );
      }),
      catchError(error => {
        console.error('Error adding bank account:', error);
        return of(null); // Handle errors and return a default value
      })
    );
  }

  
  
  getCompteBancaireDetails(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url);
  }

  deleteCompteBancaire(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.delete<any>(url);
  }

  modifyCompteBancaire(userId: number, userData: BankAccount): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.put<any>(url, userData);
  }

  getCompteBancaireById(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url);
  }
}
