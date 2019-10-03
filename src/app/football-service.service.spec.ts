import { TestBed } from '@angular/core/testing';

import { FootballServiceService } from './football-service.service';

describe('FootballServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FootballServiceService = TestBed.get(FootballServiceService);
    expect(service).toBeTruthy();
  });
});
