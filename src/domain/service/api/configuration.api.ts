import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Configuration} from '../../model/configuration';
import {ConfigurationStore} from '../../store/configuration.store';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationApi {

  constructor(private readonly store: ConfigurationStore) {
  }

  syncConfiguration(): Configuration {
    return this.store.syncState().configuration;
  }

  configuration(): Observable<Configuration> {
    return this.store.configuration$;
  }

  saveConfiguration(configuration: Configuration): void {
    this.store.saveConfiguration(configuration);
  }
}
