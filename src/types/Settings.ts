export interface CloudProviderSettings {
  aws: boolean;
  gcp: boolean;
  azure: boolean;
  openshift: boolean;
}

export const SETTINGS_STORAGE_KEY = 'cloud-architecture-settings';

export const defaultSettings: CloudProviderSettings = {
  aws: true,
  gcp: false,
  azure: false,
  openshift: false,
};
