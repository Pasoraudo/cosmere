import {Injectable} from '@angular/core';

import {Router as NgRouter} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class Router {

  constructor(private router: NgRouter) {
  }

  public navigate(commands: any[], extras?: any): Promise<boolean> {
    return this.router.navigate(commands, extras);
  }
}
