import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { fetchAndActivate, getRemoteConfig, getValue, RemoteConfig } from 'firebase/remote-config';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseConfigService {

  private remoteConfig: RemoteConfig;

  constructor() { 
    const app = initializeApp(environment.firebaseConfig)
    this.remoteConfig = getRemoteConfig(app)

    this.remoteConfig.settings = {
      minimumFetchIntervalMillis: 0,
      fetchTimeoutMillis: 60000
    }

    this.remoteConfig.defaultConfig = {
      showNewFeature: false,
    };
  }

  async isFeatureEnabled(flag: string): Promise<boolean> {
    await fetchAndActivate(this.remoteConfig);
    return getValue(this.remoteConfig, flag).asBoolean();
  }
}
