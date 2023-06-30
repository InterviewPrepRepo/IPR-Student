import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor() { }

  private tabSwitch = new Subject<number>();

  tabSwitchObservable$ = this.tabSwitch.asObservable();

  public notifyTabSwitch(tabIndex : number) {
    this.tabSwitch.next(tabIndex);
  }
}
