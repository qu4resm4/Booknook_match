import { TestBed } from '@angular/core/testing';

import { StorageBooksService } from './storage-books.service';

describe('StorageBooksService', () => {
  let service: StorageBooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageBooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
