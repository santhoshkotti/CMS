/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ContractviewserviceService } from './contractviewservice.service';

describe('Service: Contractviewservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContractviewserviceService],
    });
  });

  it('should ...', inject(
    [ContractviewserviceService],
    (service: ContractviewserviceService) => {
      expect(service).toBeTruthy();
    }
  ));
});
