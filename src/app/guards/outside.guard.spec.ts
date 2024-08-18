import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { outsideGuard } from './outside.guard';

describe('outsideGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => outsideGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
