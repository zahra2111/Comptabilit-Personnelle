import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import{ jwtDecode} from 'jwt-decode'; // Corrected import
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api/login';
  private currentUserUrl = 'http://127.0.0.1:8000/api/current_user';
  private userdetailURL = 'http://127.0.0.1:8000/api/users/';
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { username, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
        } else {
          console.error('No token received from server');
        }
      })
    );
  }
 
  getUserInfoFromToken(): any {
    const token = localStorage.getItem('authToken'); // Consistent use of localStorage
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken'); // Consistent use of localStorage
  }

  logout() {
    // Remove JWT token from local storage
    localStorage.removeItem('authToken'); // Consistent key

    // Redirect to login page
    this.router.navigate(['/authentication/login']);
  }

  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.currentUserUrl, { headers });
  }
  getUserById(userId: number): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(`${this.userdetailURL}/${userId}`, { headers });
  }

  private changePasswordUrl = 'http://127.0.0.1:8000/api/change_password'; // Your Symfony endpoint
  private registerURL = 'http://127.0.0.1:8000/api/regiter'; // Your Symfony endpoint
  register(email: string, currentPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.changePasswordUrl, 
      { email, currentPassword, newPassword }, 
      { headers }
    );
  }
  changePassword(email: string, currentPassword: string, newPassword: string): Observable<any> {
    const token = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.changePasswordUrl, 
      { email, currentPassword, newPassword }, 
      { headers }
    );
  }
  // New method to get current user ID
  getCurrentUserId(): Observable<number | null> {
    return this.getCurrentUser().pipe(
      map(user => {
        if (user && user.id !== undefined) {
          return user.id; // Extract and return the user ID
        } else {
          console.error('User ID not found');
          return null;
        }
      })
    );}
 
}
