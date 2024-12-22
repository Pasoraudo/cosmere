import {Injectable, Signal} from '@angular/core';
import {Configuration} from '../../model/configuration';
import {ConfigurationStore} from '../../store/configuration.store';

@Injectable({
  providedIn: 'root',
})
export class ConfigurationApi {

  constructor(private readonly store: ConfigurationStore) {
  }

  saveConfiguration(configuration: Configuration): void {
    this.store.saveConfiguration(configuration);
  }
  
  configuration(): Signal<Configuration> {
    return this.store.configuration;
  }
}
