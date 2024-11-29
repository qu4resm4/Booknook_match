import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Booknook',
  webDir: 'www',
  server: {
    cleartext: true,
    androidScheme: 'https'
  }
};

export default config;
