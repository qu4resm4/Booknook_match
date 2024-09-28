import { Component, ElementRef, ViewChild, Input } from '@angular/core';
import { Gesture, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-perfilmodal',
  templateUrl: './perfilmodal.component.html',
  styleUrls: ['./perfilmodal.component.scss'],
})
export class PerfilmodalComponent{
  @Input() perfis: any;
  @ViewChild('swipeCard', { read: ElementRef, static: true }) swipeCard!: ElementRef;

  constructor(private gestureCtrl: GestureController) {}

  ngAfterViewInit() {
    this.createSwipeGesture();
  }

  createSwipeGesture() {
    const gesture: Gesture = this.gestureCtrl.create({
      el: this.swipeCard.nativeElement,
      gestureName: 'swipe-card',
      onMove: ev => this.onMove(ev),
      onEnd: ev => this.onEnd(ev),
    });
    gesture.enable(true);
  }

  onMove(ev: any) {
    const card = this.swipeCard.nativeElement;
    card.style.transform = `translateX(${ev.deltaX}px) rotate(${ev.deltaX / 20}deg)`;

    if (ev.deltaX > 100) {
      // Like (para a direita)
      card.classList.add('like-animation');
    } else if (ev.deltaX < -100) {
      // Dislike (para a esquerda)
      card.classList.add('dislike-animation');
    } else {
      card.classList.remove('like-animation', 'dislike-animation');
    }
  }

  onEnd(ev: any) {
    const card = this.swipeCard.nativeElement;
  
    if (ev.deltaX > 150) {
      card.style.transition = '0.5s ease-out';
      card.style.transform = `translateX(1000px) rotate(${ev.deltaX / 20}deg)`;
      card.remove();
    } else if (ev.deltaX < -150) {
      card.style.transition = '0.5s ease-out';
      card.style.transform = `translateX(-1000px) rotate(${ev.deltaX / 20}deg)`;
      card.remove();
    } else {
      // Voltar ao centro
      card.style.transition = '0.3s ease-out';
      card.style.transform = 'translateX(0px) rotate(0deg)';
      card.classList.remove('like-animation', 'dislike-animation');
    }
  }
  
  resetCard() {
    const card = this.swipeCard.nativeElement;
    card.style.transition = '';
    card.style.transform = '';
    card.classList.remove('like-animation', 'dislike-animation');
  }}
