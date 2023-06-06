import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {isEqual} from 'lodash';
import {Configuration, newConfiguration} from '../model/configuration';

export interface ConfigurationState {
  configuration: Configuration;
}

const emptyState = (): ConfigurationState => ({
  configuration: newConfiguration()
});

@Injectable({
  providedIn: 'root',
})
export class ConfigurationStore extends ComponentStore<ConfigurationState> {

  public readonly configuration$ = this.select(state => state.configuration);

  constructor() {
    super(emptyState());
  }

  saveConfiguration(configuration: Configuration): void {
    if (isEqual(this.get().configuration, configuration))
      return;

    this.patchState(state => ({
      configuration: configuration
    }));
  }

  syncState(): ConfigurationState {
    return this.get();
  }

  syncConfiguration(): Configuration | null {
    return this.get().configuration;
  }

  reset(): void {
    this.patchState(emptyState());
  }
}
