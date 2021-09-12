import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private rangeStore : Subject<any> = new Subject();
  constructor() { }

  addToRangeStore(value : any) : void {
    this.rangeStore.next(value);
  }

  getRangeStore() : Observable<any> {
    return this.rangeStore;
  }
}
