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

  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  
  // SALVAR O ID DO USUARIO LOGADO NO STORAGE (key: userID, value: id do usuario).
  // NO LOGOUT LEMBRAR DE LIMPAR OU ASSOCIAR VALOR NULL ao userID.

  //CRUD da estante de livros  
  // metodo para adicionar livro a estante de um usuario
  // metodo para pegar os livros da estante
  // metodo excluir livro da estante
  // metodo editar estante do livro, ele pega a estante, replace para tirar o livro desejado, e associa a nova estante editada
}