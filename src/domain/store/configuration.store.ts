import {Injectable} from '@angular/core';
import {isEqual} from 'lodash';
import {Configuration, newConfiguration} from '../model/configuration';
import {signalStore, withState} from '@ngrx/signals';

export interface ConfigurationState {
  configuration: Configuration;
}

const emptyState = (): ConfigurationState => ({
  configuration: newConfiguration()
});

@Injectable({
  providedIn: 'root',
})
export class ConfigurationStore extends signalStore(
  {protectedState: false},
  withState<ConfigurationState>(emptyState()),
) {


  saveConfiguration(configuration: Configuration): void {
    if (isEqual(this.get().configuration, configuration))
      return;

    this.patchState(state => ({
      configuration: configuration
    }));
  }
}
