import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';

export type ApiVersion = 'v1';

@Injectable({
  providedIn: 'root',
})
export class RouteGenerator {
  generate(apiRouteName: string): string {
    let relativeUrl = apiRouteName;

    if (!relativeUrl.startsWith('/'))
      relativeUrl = '/' + relativeUrl;

    return 'assets/db' + relativeUrl + '.json';
  }
}
