import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteGenerator {
  generate(apiRouteName: string): string {
    let relativeUrl = apiRouteName;

    if (!relativeUrl.startsWith('/'))
      relativeUrl = '/' + relativeUrl;

    return 'public/assets/db' + relativeUrl + '.json';
  }
}
