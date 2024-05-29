import * as OAuth2Server from '@node-oauth/express-oauth-server'; // Update import statement

import { model } from './oauth-model';

export const oauthServer = new OAuth2Server({
  model: model,
  // grants: ['authorization_code', 'refresh_token', 'access_token'],
  accessTokenLifetime: 60 * 60 * 24, // 24 hours, or 1 day
  allowEmptyState: true,
  allowExtendedTokenAttributes: true,
});
