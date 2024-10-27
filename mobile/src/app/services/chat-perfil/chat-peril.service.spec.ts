import { TestBed } from '@angular/core/testing';

import { ChatPerilService } from './chat-peril.service';

describe('ChatPerilService', () => {
  let service: ChatPerilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatPerilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
