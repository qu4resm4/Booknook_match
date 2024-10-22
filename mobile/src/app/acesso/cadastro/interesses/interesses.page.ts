import { Component, OnInit } from '@angular/core';
import{ PreferencesService } from '../../../services/preferences/preferences.service'

@Component({
  selector: 'app-interesses',
  templateUrl: './interesses.page.html',
  styleUrls: ['./interesses.page.scss'],
})
export class InteressesPage implements OnInit {
  preferences: any[] = [];
  searchTerm = '';
  selectedPreferences: any[] = []; //tem que fazer isso salvar os ids e alterar os ids no json. pq isso será enviado p registro
  filteredPreferences = [...this.preferences];

  constructor(
    private pref: PreferencesService
  ) { }

  async getPreferences() {
    await this.pref.getPreferences().subscribe((data: any[]) => {
      this.preferences = data;
    });
  }

  ngOnInit() {
    this.getPreferences();
  }

  // Função para adicionar uma preferência à lista selecionada
  selectPreference(preference: any) {
    if (!this.selectedPreferences.includes(preference)) {
      this.selectedPreferences.push(preference);
    }
    console.log("select ",this.selectedPreferences);
    console.log("filtra ", this.filteredPreferences)
  }

  // Função para remover uma preferência da lista selecionada
  removePreference(preference: any) {
    this.selectedPreferences = this.selectedPreferences.filter(
      pref => pref.id !== preference.id
    );
  }

}
