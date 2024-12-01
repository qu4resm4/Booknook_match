import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  constructor(private http: HttpClient) {}

  // Obtém as preferências do arquivo JSON
  getPreferences(): Observable<any[]> {
    return this.http.get<any[]>('/assets/preferences.json');
  }
}
