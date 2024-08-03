import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankAccount } from './compteBancaire';

@Injectable({
  providedIn: 'root'
})
export class CompteBancaireService {
  private apiUrl = 'http://127.0.0.1:8000/api/banks';

  constructor(private http: HttpClient) { }

  getCompteBancaires(page: number = 1): Observable<any> {
    const url = `${this.apiUrl}?page=${page}`;
    return this.http.get<any>(url);
  }
  httpOptions = { headers: new HttpHeaders({ })}

  addCompteBancaire(user: BankAccount): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post<any>(this.apiUrl, body, { headers });
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
