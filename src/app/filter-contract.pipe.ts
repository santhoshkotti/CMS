import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterContract',
})
export class FilterContractPipe implements PipeTransform {
  transform(value: any, filteredString: any, statusFilter: any) {
    let contracts = [];
    if (statusFilter != null && filteredString != null) {
      contracts = [];
      for (const contract of value) {
        if (
          contract['status'] === statusFilter &&
          contract['contract'] === filteredString
        ) {
          contracts.push(contract);
        }
      }
      return contracts;
    }

    if (statusFilter) {
      for (const contract of value) {
        if (contract['status'] === statusFilter) {
          contracts.push(contract);
        }
      }
      return contracts;
    }
    if (filteredString) {
      for (const contract of value) {
        if (contract['contract'] === filteredString) {
          contracts.push(contract);
        }
      }
      return contracts;
    }

    // if (statusFilter) {
    //   for(const contract of value){
    //     if(contract['contract']=== statusFilter){
    //       contracts.push(contract)
    //     }
    //   }
    //}
    //  if(contracts === null){
    //   return value;
    //  }
    // return contracts;
    if (value.length === 0 || !filteredString || statusFilter == null) {
      return value;
    }
  }
}
