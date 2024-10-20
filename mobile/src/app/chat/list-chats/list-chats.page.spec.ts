import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { ItemChatComponentModule } from '../item-chat/item-chat.module';

import { ListChatsPage } from './list-chats.page';

describe('ListChatsPage', () => {
  let component: ListChatsPage;
  let fixture: ComponentFixture<ListChatsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListChatsPage],
      imports: [IonicModule.forRoot(), ItemChatComponentModule, RouterModule.forRoot([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ListChatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

