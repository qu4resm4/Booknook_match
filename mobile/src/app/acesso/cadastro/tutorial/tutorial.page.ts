import { Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage {

  constructor(private router: Router){}

  goToInterests() {
    this.router.navigate(['/interesses']);
  }

}