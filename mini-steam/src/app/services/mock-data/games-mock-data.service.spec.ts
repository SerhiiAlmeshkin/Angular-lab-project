import { TestBed } from '@angular/core/testing';

import { GamesMockDataService } from './games-mock-data.service';

describe('GamesMockDataService', () => {
  let service: GamesMockDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GamesMockDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
