import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {firstValueFrom, throwError} from 'rxjs';
import {RouteGenerator} from './route-generator.service';
import {catchError} from 'rxjs/operators';
import {keys} from 'lodash';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiClient {

  requestCache: Record<string, { promise: Promise<any>; timestamp: number; response: any } | null | undefined> = {};

  constructor(private http: HttpClient, protected router: RouteGenerator) {
    setInterval(() => {
      this.clearCache();
    },300);
  }

  public get<T>(routeName: string): Promise<T> {
    const url = this.router.generate(routeName);
    return new Promise<T>(async (resolve, reject) => {
      try {
        const httpResponse = await firstValueFrom(this.http.get<T>(url).pipe(
          catchError((error: any) => throwError(error))
        ));

        resolve(httpResponse);
      } catch (e) {
        reject(e);
      }
    });
  }

  // public post<T>(routeName: string, body?: any, params?: any): Promise<T> {
  //   if (!params)
  //     params = {};
  //
  //   if (!body)
  //     body = {};
  //
  //   const url = this.router.generate(routeName, params, 'v1');
  //
  //   return firstValueFrom(this.http.post<T>(url, body).pipe(
  //     catchError((error: any) => throwError(error))
  //   ));
  // }

  private headers(): object {
    const headers = new HttpHeaders()
      .set('app-version', environment.appVersion)
      .set('Access-Control-Allow-Origin', '*');

    return {'headers': headers};
  }

  private clearCache(): void {
    const urls = keys(this.requestCache);
    const now = (new Date()).getTime();

    for (const url of urls) {
      const cacheElement = this.requestCache[url];
      if(!cacheElement)
        continue;

      const elapsedMillis = now - cacheElement.timestamp;

      if(!cacheElement.response && elapsedMillis < 20000){
        continue;
      }

      if(cacheElement.response && elapsedMillis < 200)
        continue;

      this.requestCache[url] = null;
      delete this.requestCache[url];


    }
  }
}
