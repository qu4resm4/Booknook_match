import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inst-adicione-bio',
  templateUrl: './inst-adicione-bio.page.html',
  styleUrls: ['./inst-adicione-bio.page.scss'],
})
export class InstAdicioneBioPage implements OnInit {

  constructor(private navCtrl: NavController) {}

  redirectToNextPage() {
    this.navCtrl.navigateForward('bio');
  }

  ngOnInit() {
  }

}
