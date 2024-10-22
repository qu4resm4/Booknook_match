import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  private API_URL = '../../../assets/json/preferences.json';

  constructor(private http: HttpClient) { }

  // Método para buscar os dados
  getPreferences(): Observable<any> {
    return this.http.get(this.API_URL);
  }
}
