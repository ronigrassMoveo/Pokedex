import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  private homeResetSubject = new Subject<void>();

  readonly homeReset$ = this.homeResetSubject.asObservable();

  triggerHomeReset(): void {
    this.homeResetSubject.next();
  }
}