import { TestBed } from '@angular/core/testing';

import { ListNewsService } from './list-news.service';

describe('ListNewsService', () => {
  let service: ListNewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListNewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
