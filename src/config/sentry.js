import Constants from 'expo-constants';
import * as Sentry from 'sentry-expo';

import { Tracing } from './sentryPlatform';

const tracingOrigins = ['localhost', 'cna.dev.monk.ai', 'cna.staging.monk.ai', 'cna.preview.monk.ai', 'cna.monk.ai'];

Sentry.init({
  dsn: Constants.manifest.extra.SENTRY_DSN,
  environment: Constants.manifest.extra.ENV,
  debug: Constants.manifest.extra.ENV !== 'production',
  enableInExpoDevelopment: true,
  tracesSampleRate: Constants.manifest.extra.ENV !== 'production' ? 1.0 : 0.2,
  beforeSend(event) {
    console.log(event);

    return event;
  },
  integrations: [
    new Tracing({
      tracingOrigins,
    }),
  ],
});

export default Sentry;
