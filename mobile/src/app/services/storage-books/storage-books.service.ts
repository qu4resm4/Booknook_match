import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from '../auth/auth.service'

interface Livro {
  id: string; 
  title: string;
  thumbnail?: string;
}

@Injectable({
  providedIn: 'root'
})
export class StorageBooksService {
  private _storage: Storage | null = null;
  private userID: string = 'o39zVf8XADhr14jIJL26pKUTJZg2';

  constructor(
    private storage: Storage,
    private auth: AuthService
  ) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.setUserLoggedIn(this.userID);
    await this.setStorage(this.userID);
  }

  async setUserLoggedIn(user: String){
    this._storage?.set("Usuario-da-sessao", user);
  }

  async getUserLoggedIn() {
    let user = await this._storage?.get("Usuario-da-sessao");
    return user;
  }

  async setStorage(user: string) {
    //CRIAR ESTANTES DEPOIS DE VERIFICAR SE O USUARIO JÁ TEM ELAS CRIADAS NO DISPOSITIVO
    //buscar keys, pegar array de keys
    let keys = await this._storage?.keys() || [];
    let existeEstante = false;
    let storage: object[] = [];
    console.log("storage")
    console.log(keys); 
    //foreach no array e verificar se tem algum com a substring que é o id do usuario
    keys.forEach(key => {
      if(key.includes(user)) {
        existeEstante = true;
      }
    });

    if(!existeEstante){
      //todos
      this._storage?.set(user+'-TODOS', storage);
      //favoritos
      this._storage?.set(user+'-FAVORITOS', storage);
      //resenhados
      this._storage?.set(user+'-RESENHADOS', storage);
  
    }
}

  async adicionarNaEstante(livro: Livro, estante: string){
    //lógica de pegar o Storage Json
    let storage: object[] = await this._storage?.get(await this.getUserLoggedIn() + estante) || [];
    // Verifica se o livro já existe no array
    const livroExistente = storage.find((item: any) => item.id === livro.id);

    if (!livroExistente) {
      storage.push(livro); // Adiciona o livro apenas se ele não estiver no array
    }
    //e alterar ele só que só em todos (string) com o novo livro inserido
    this._storage?.set(await this.getUserLoggedIn() + estante, storage);
  }

  excluirDeTodos(){
    //lógica de excluir
  }

  async getTodos(estante: string) {
    let storage: object[] = await this._storage?.get(await this.getUserLoggedIn() + estante) || [];
    return storage;
  }

  adicionarFavoritos(){
    //lógica de pegar o Storage Json
    //e alterar ele só que só no favorito (string) com o novo livro inserido
    //this.setStorage(iduser, newStorageJSON)
  }

  excluirDeFavoritos(){
    //lógica de excluir
  }
  
  // SALVAR O ID DO USUARIO LOGADO NO STORAGE (key: userID, value: id do usuario).
  // NO LOGOUT LEMBRAR DE LIMPAR OU ASSOCIAR VALOR NULL ao userID.

  //CRUD da estante de livros  
  // metodo para adicionar livro a estante de um usuario
  // metodo para pegar os livros da estante
  // metodo excluir livro da estante
  // metodo editar estante do livro, ele pega a estante, replace para tirar o livro desejado, e associa a nova estante editada (não faz mais sentido, não vou fazer esta porra)
}