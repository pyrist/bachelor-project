import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArrayToStringService {

  constructor() { }

  arrayToString(input: any ): string | undefined {
    var array = []
    for (var x of input){
      if (x != null){
        array.push(x)
      }
    }
    var result = array.toString().replace(new RegExp(',', 'g'), ', ')
    return result;
  }
}
