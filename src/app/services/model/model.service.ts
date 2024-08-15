import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Model } from './Model'; // Import your Model class
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModelService {
  private apiUrl = 'http://127.0.0.1:8000/api/modeles'; // Adjust API URL for models

  constructor(private http: HttpClient) { }

  // Fetch all models
  getModels(): Observable<Model[]> {
    return this.http.get<Model[]>(this.apiUrl);
  }

  // Add a new model
  addModel(model: Model): Observable<Model> {
    return this.http.post<Model>(this.apiUrl, model);
  }

  // Get details of a specific model
  getModelDetails(modelId: number): Observable<Model> {
    const url = `${this.apiUrl}/${modelId}`;
    return this.http.get<Model>(url);
  }

  // Delete a model
  deleteModel(modelId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${modelId}`);
  }

  // Modify an existing model
  modifyModel(modelId: number, modelData: Model): Observable<Model> {
    const url = `${this.apiUrl}/${modelId}`;
    return this.http.put<Model>(url, modelData);
  }

  // Fetch default model to create a transaction
  getDefaultModel(): Observable<Model | null> {
    const defaultModelUrl = `${this.apiUrl}/default`; // Adjust to your endpoint for fetching a default model
    return this.http.get<Model>(defaultModelUrl).pipe(
      catchError(error => {
        console.error('Error fetching default model:', error);
        return of(null); // Return null in case of error
      })
    );
  }
}
