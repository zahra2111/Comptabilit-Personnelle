import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://127.0.0.1:8000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(page: number = 1): Observable<any> {
    const url = `${this.apiUrl}?page=${page}`;
    console.log(url);
    return this.http.get<any>(url);
  }
  httpOptions = { headers: new HttpHeaders({ })}

  addUser(user: User): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post<any>(this.apiUrl, body, { headers });
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
