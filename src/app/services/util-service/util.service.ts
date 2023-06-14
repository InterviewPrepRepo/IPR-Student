import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }

  //Takes any array collection of objects and creates a map that organizes the collection according to the value of the key provided. Used often in many components so made a util here
  categorizeByProperty(collection: any[], propName: string) : Record<string, any[]> {
    let sorted : Record<string, any[]> = {};

    collection.map((item) => {
      if(item[propName] in sorted) {
        sorted[item[propName]].push(item);
      }
      else {
        sorted[item[propName]] = [ item ];
      }
    })

    return sorted;
  }

  translateTimeZone() : number {
    return 700;
  }
}
