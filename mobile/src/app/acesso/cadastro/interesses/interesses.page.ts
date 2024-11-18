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
  preferences: any[] = []; // Tds as preferências carregadas
  filteredPreferences: any[] = []; // preferencias filtradas baseado na pesquisa
  selectedPreferences: any[] = []; // preferencias selecionadas pelo usuário
  searchTerm: string = ''; // termo de busca do input

  constructor(
    private lib: LivrosService,
    private prefService: PreferencesService,
    private auth: AuthService,
    private router: Router,
    private firestore: AngularFirestore,
    private navCtrl: NavController,
    private toastController: ToastController 
  ) {}

  ngOnInit() {
    this.loadPreferences();
  }

  // carrega as preferencias do arquivo preferences.json
  async loadPreferences() {
    this.prefService.getPreferences().subscribe((data: any[]) => {
      this.preferences = data;
      this.filteredPreferences = [...this.preferences];
    });
  }

  // filtra as preferencias cm base na busca
  filterPreferences() {
    if (this.searchTerm.trim() === '') {
      this.filteredPreferences = [...this.preferences];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredPreferences = this.preferences.map((category) => ({
        categoria: category.categoria,
        preferencias: category.preferencias.filter((pref: any) =>
          pref.preferencia.toLowerCase().includes(searchTermLower)
        ),
      })).filter(category => category.preferencias.length > 0);
    }
  }

  // adiciona uma preferencia na lista selecionada
  selectPreference(preference: any) {
    const exists = this.selectedPreferences.find(pref => pref.id === preference.id);
    if (!exists) {
      this.selectedPreferences.push(preference);
    }
  }

  // remove uma preferencia da lista selecionada
  removePreference(preference: any) {
    this.selectedPreferences = this.selectedPreferences.filter(
      pref => pref.id !== preference.id
    );
  }

  // Exibe um toast com a mensagem fornecida
  async presentToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000, // Duração do toast em milissegundos
      position: 'bottom', // Posição do toast na tela
    });
    await toast.present();
  }

  // salva as preferencias selecionadas no Firestore
  async savePreferences() {
    try {
      const userId = await this.auth.getUserId(); // recupera o UID
      if (!userId) {
        this.presentToast('Usuário não autenticado.');
        return;
      }
  
      const preferencesData = {
        preferences: this.selectedPreferences,
        updatedAt: new Date(),
      };
  
      // salva as preferências no Firestore, no documento do usuário
      await this.firestore.collection('interests').doc(userId).set(preferencesData, { merge: true });
      this.presentToast('Preferências salvas com sucesso!');
      
      // seta estado do botão na pagina de informação do livro para adicionar resenha
      this.lib.setAdd('bio');

      // redireciona para a pagina "pesquisar" após salvar
      this.router.navigate(['/pesquisar']);

    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
      this.presentToast('Ocorreu um erro ao salvar as preferências.');
    }
  }
}
