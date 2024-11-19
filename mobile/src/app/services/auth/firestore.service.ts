import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Altere para AngularFirestore
import { collection, addDoc } from '@firebase/firestore'; // Se precisar de métodos específicos

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {} // Utilize AngularFirestore

  async addResenha(resenha: any) {
    const resenhasCollection = this.firestore.collection('resenhas'); // Substitua 'resenhas' pelo nome da coleção no Firestore
    return await resenhasCollection.add(resenha);
  }
}
