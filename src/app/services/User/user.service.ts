import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable , forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from './user';
import { BankAccount } from '../CompteBancaire/compteBancaire';

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
