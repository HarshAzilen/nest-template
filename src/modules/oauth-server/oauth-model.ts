import {
  AuthorizationCode,
  AuthorizationCodeModel,
  BaseModel,
  Client,
  Falsey,
  PasswordModel,
  RefreshToken,
  RefreshTokenModel,
  RequestAuthenticationModel,
  Token,
  User,
} from './oauth.interface';

interface ExtendedModel extends BaseModel, RequestAuthenticationModel {}

export const model: AuthorizationCodeModel | PasswordModel | RefreshTokenModel | ExtendedModel = {
  async generateAccessToken(client: Client, user: User, scope: string[]): Promise<string> {
    // Generate a new access token
    return 'generated-access-token';
  },

  async getClient(clientId: string, clientSecret?: string): Promise<Client | Falsey> {
    // Fetch client from your database or another storage
    return {
      id: clientId,
      grants: ['authorization_code', 'password', 'refresh_token'],
      redirectUris: ['http://example.com/cb'],
    };
  },

  async saveToken(token: Token, client: Client, user: User): Promise<Token | Falsey> {
    // Save the token to your database or another storage
    return token;
  },

  async generateRefreshToken(client: Client, user: User, scope: string[]): Promise<string> {
    // Generate a new refresh token
    return 'generated-refresh-token';
  },

  async generateAuthorizationCode(client: Client, user: User, scope: string[]): Promise<string> {
    // Generate a new authorization code
    return 'generated-authorization-code';
  },

  async getAuthorizationCode(authorizationCode: string): Promise<AuthorizationCode | Falsey> {
    // Fetch authorization code from your database or another storage
    return {
      accessToken: 'access-token', // Include the accessToken property
      authorizationCode,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000), // code expiration time
      redirectUri: 'http://example.com/cb',
      client: { id: 'clientId', grants: ['authorization_code'], redirectUris: ['http://example.com/cb'] },
      user: { id: 'userId' },
    };
  },

  async saveAuthorizationCode(
    code: Pick<
      AuthorizationCode,
      'authorizationCode' | 'expiresAt' | 'redirectUri' | 'scope' | 'codeChallenge' | 'codeChallengeMethod'
    >,
    client: Client,
    user: User,
  ): Promise<AuthorizationCode | Falsey> {
    // Generate the accessToken here
    const accessToken = 'generated-access-token';

    // Save the authorization code to your database or another storage
    return {
      accessToken,
      authorizationCode: code.authorizationCode,
      expiresAt: code.expiresAt,
      redirectUri: code.redirectUri,
      scope: code.scope,
      codeChallenge: code.codeChallenge,
      codeChallengeMethod: code.codeChallengeMethod,
      client,
      user,
    };
  },

  async revokeAuthorizationCode(code: AuthorizationCode): Promise<boolean> {
    // Revoke the authorization code in your database or another storage
    return true;
  },

  async getUser(username: string, password: string, client: Client): Promise<User | Falsey> {
    // Fetch user from your database or another storage
    return { id: 'userId' };
  },

  async getRefreshToken(refreshToken: string): Promise<RefreshToken | Falsey> {
    // Fetch refresh token from your database or another storage
    return {
      accessToken: 'access-token', // Placeholder access token, replace with actual logic if necessary
      refreshToken,
      client: { id: 'clientId', grants: ['refresh_token'], redirectUris: ['http://example.com/cb'] },
      user: { id: 'userId' },
      refreshTokenExpiresAt: new Date(Date.now() + 60 * 60 * 1000),
      scope: ['read'], // Change here to an array of strings
    };
  },

  async revokeToken(token: RefreshToken): Promise<boolean> {
    // Revoke the refresh token in your database or another storage
    return true;
  },

  async validateScope(user: User, client: Client, scope?: string[]): Promise<string[] | Falsey> {
    // Validate the requested scope
    return scope || [];
  },

  async validateRedirectUri(redirectUri: string, client: Client): Promise<boolean> {
    // Validate the provided `redirectUri`
    return client.redirectUris.includes(redirectUri);
  },

  async verifyScope(token: Token, scope: string | string[]): Promise<boolean> {
    // Verify the scope of the token
    return true;
  },

  async getAccessToken(accessToken: string): Promise<Token | Falsey> {
    // Fetch access token from your database or another storage
    return {
      accessToken,
      client: { id: 'clientId', grants: ['authorization_code'], redirectUris: ['http://example.com/cb'] },
      user: { id: 'userId' },
    };
  },
};
