import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tier } from './Tier';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TierService {
  private apiUrl = 'http://127.0.0.1:8000/api/tiers'; // Adjust API URL for tiers
  private userApiUrl = 'http://127.0.0.1:8000/api/current_user'; // URL to fetch the current user

  constructor(private http: HttpClient, private authService: AuthService) { }

  getTiers(): Observable<Tier[]> {
    return this.http.get<Tier[]>(this.apiUrl); // Fetch all tiers
  }

  addTier(tier: Tier): Observable<Tier> {
    return this.http.post<Tier>(this.apiUrl, tier); // Add a new tier
  }

  getTierDetails(tierId: number): Observable<any> {
    const url = `${this.apiUrl}/${tierId}`;
    return this.http.get<any>(url);
  }

  deleteTier(tierId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${tierId}`);
  }

  modifyTier(tierId: number, tierData: Tier): Observable<any> {
    const url = `${this.apiUrl}/${tierId}`;
    return this.http.put<any>(url, tierData);
  }

  getTiersForCurrentUser(): Observable<Tier[]> {
    return this.http.get<Tier[]>(`${this.apiUrl}/current_user`); // Adjust endpoint as needed
  }

  getTierById(tierId: number): Observable<any> {
    const url = `${this.apiUrl}/${tierId}`;
    return this.http.get<any>(url);
  }
}
