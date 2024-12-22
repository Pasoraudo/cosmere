import {Injectable} from '@angular/core';
import {isEqual} from 'lodash';
import {Configuration, defaultConfiguration} from '@model/configuration';
import {patchState, signalStore, withState} from '@ngrx/signals';

export interface ConfigurationState {
  configuration: Configuration;
}

const emptyState = (): ConfigurationState => ({
  configuration: defaultConfiguration()
});

@Injectable({
  providedIn: 'root',
})
export class ConfigurationStore extends signalStore(
  {protectedState: false},
  withState<ConfigurationState>(emptyState()),
) {


  saveConfiguration(configuration: Configuration): void {
    const actualConfiguration = this.configuration();
    if (isEqual(actualConfiguration, configuration))
      return;

    patchState(this, {
      configuration: configuration
    });
  }
}
