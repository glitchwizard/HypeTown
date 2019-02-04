import { TestBed, inject } from '@angular/core/testing';

import { SongkickService } from './songkick.service';

describe('SongkickService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SongkickService]
    });
  });

  it('should be created', inject([SongkickService], (service: SongkickService) => {
    expect(service).toBeTruthy();
  }));
});
