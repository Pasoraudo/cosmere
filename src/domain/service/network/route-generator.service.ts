import {Injectable} from '@angular/core';
import {environment} from 'environments/environment';

export type ApiVersion = 'v1';

@Injectable({
  providedIn: 'root',
})
export class RouteGenerator {
  private static readonly apiRoutePrefix = '/api/v1';

  static host(): string {
    if (environment.production) {
      if (environment.environment === 'development')
        return 'https://cosmere-api-dev.alejandro.com';

      return 'https://cosmere-api.alejandro.com';
    }


    return 'http://localhost:8085';
  }


  generate(apiRouteName: string, params: any, apiVersion: ApiVersion): string {
    let relativeUrl = apiRouteName;
    const apiUrl = RouteGenerator.host();

    if (!relativeUrl.startsWith('/'))
      relativeUrl = '/' + relativeUrl;

    return apiUrl + RouteGenerator.apiRoutePrefix + relativeUrl;

  }

}
