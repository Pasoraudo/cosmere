import {Injectable} from '@angular/core';

export type AppType = 'user' | 'mobile' | 'admin';

@Injectable({
  providedIn: 'root',
})
export class App {
  private appType: AppType = 'admin';

  isMobile(): boolean {
    return this.appType === 'mobile';
  }

  isUser(): boolean {
    return this.appType === 'user';
  }

  isAdmin(): boolean {
    return this.appType === 'admin';
  }


}
