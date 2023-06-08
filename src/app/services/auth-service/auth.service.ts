import { Injectable } from '@angular/core';
import User from 'src/app/models/user';
import { LocalStorageService } from 'angular-web-storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private local: LocalStorageService) { }

  public isAuthenticated(): boolean {
    if (this.local.get('ipr_currentUser')) {
      return true;
    }
    else {
      return false;
    }
  }

  public getCurrentUser(): User {
    return this.local.get('ipr_currentUser');
  }

  public setCurrentUser(userToSet: User): void {
    if (!userToSet) return;
    this.local.set('ipr_currentUser', userToSet, 1, 'd');
  }

  public clearCurrentUser(): void {
    this.local.remove('ipr_currentUser');
  }
}
