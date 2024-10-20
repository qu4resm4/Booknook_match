import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Message } from '../../services/message/message.service';

@Component({
  selector: 'app-item-chat',
  templateUrl: './item-chat.component.html',
  styleUrls: ['./item-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ItemChatComponent {
  private platform = inject(Platform);
  @Input() message?: Message;
  isIos() {
    return this.platform.is('ios')
  }
}