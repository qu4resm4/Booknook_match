import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageBooksService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  setStorage(user: string, storage: any) {
    this._storage?.set(user, storage);
  }

  adicionarTodos(){
    //lógica de pegar o Storage Json
    //e alterar ele só que só em todos (string) com o novo livro inserido
    //this.setStorage(iduser, newStorageJSON)
  }

  excluirDeTodos(){
    //lógica de excluir
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