import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'mobile',
  webDir: 'www',
  server: {
    cleartext: true,
    androidScheme: 'https'
  }
};

export default config;
