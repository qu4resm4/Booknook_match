import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../../../services/preferences/preferences.service';
import { AuthService } from '../../../services/auth/auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LivrosService } from 'src/app/services/livros/livros.service';

@Component({
  selector: 'app-interesses',
  templateUrl: './interesses.page.html',
  styleUrls: ['./interesses.page.scss'],
})
export class InteressesPage implements OnInit {
  preferences: any[] = []; // Todas as preferências carregadas
  filteredPreferences: any[] = []; // Preferências filtradas com base na pesquisa
  selectedPreferences: any[] = []; // Preferências selecionadas pelo usuário
  searchTerm: string = ''; // Termo de busca

  constructor(
    private livrosService: LivrosService,
    private prefService: PreferencesService,
    private authService: AuthService,
    private router: Router,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadPreferences();
  }

  async loadPreferences() {
    this.prefService.getPreferences().subscribe((data: any[]) => {
      this.preferences = data;
      this.filteredPreferences = [...this.preferences];
    });
  }

  filterPreferences() {
    if (this.searchTerm.trim() === '') {
      this.filteredPreferences = [...this.preferences];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredPreferences = this.preferences
        .map((category) => ({
          categoria: category.categoria,
          preferencias: category.preferencias.filter((pref: any) =>
            pref.preferencia.toLowerCase().includes(searchTermLower)
          ),
        }))
        .filter((category) => category.preferencias.length > 0);
    }
  }

  selectPreference(preference: any) {
    const exists = this.selectedPreferences.find((pref) => pref.id === preference.id);
    if (!exists) {
      this.selectedPreferences.push(preference);
    }
  }

  removePreference(preference: any) {
    this.selectedPreferences = this.selectedPreferences.filter(
      (pref) => pref.id !== preference.id
    );
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    await toast.present();
  }

  async savePreferences() {
    try {
      const userId = await this.authService.getUserId(); // Recupera o UID
      if (!userId) {
        this.presentToast('Usuário não autenticado.');
        return;
      }

      const preferencesData = {
        preferences: this.selectedPreferences,
        updatedAt: new Date(),
      };

      // Salva as preferências no Firestore, no documento do usuário
      await this.firestore.collection('interests').doc(userId).set(preferencesData, { merge: true });
      this.presentToast('Preferências salvas com sucesso!');

      // Define o estado para adicionar resenhas
      this.livrosService.setAdd('bio');

      // Redireciona para a página "Pesquisar"
      this.router.navigate(['/pesquisar']);
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
      this.presentToast('Ocorreu um erro ao salvar as preferências.');
    }
  }
}
