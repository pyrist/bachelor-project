import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextCleanerService {

  constructor() { }

  clean(input: string | undefined): string {
    var result = input ? input.replace(/(^,)|(,$)/g, '') : ""
    return result.charAt(0).toUpperCase() + result.slice(1);
  }

}
