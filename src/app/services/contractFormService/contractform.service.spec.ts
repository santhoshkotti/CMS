import { TestBed } from '@angular/core/testing';

import { ContractformService } from './contractform.service';

describe('ContractformService', () => {
  let service: ContractformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
