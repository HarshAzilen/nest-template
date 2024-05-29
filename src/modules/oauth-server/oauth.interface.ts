import { Client as OAuthClient, User as OAuthUser, Token as OAuthToken } from '@node-oauth/oauth2-server';

export type Client = OAuthClient;

export type User = OAuthUser;

export type Token = OAuthToken;

export interface AuthorizationCode extends Token {
  authorizationCode: string;
  expiresAt: Date;
  redirectUri: string;
  scope?: string[]; // Change here
  codeChallenge?: string;
  codeChallengeMethod?: string;
}

export interface RefreshToken extends Token {
  refreshToken: string;
}

export type Falsey = false | null | undefined;

export interface BaseModel {
  generateAccessToken?(client: Client, user: User, scope: string[]): Promise<string>;
  getClient(clientId: string, clientSecret: string): Promise<Client | Falsey>;
  saveToken(token: Token, client: Client, user: User): Promise<Token | Falsey>;
}

export interface AuthorizationCodeModel extends BaseModel, RequestAuthenticationModel {
  generateRefreshToken?(client: Client, user: User, scope: string[]): Promise<string>;
  generateAuthorizationCode?(client: Client, user: User, scope: string[]): Promise<string>;
  getAuthorizationCode(authorizationCode: string): Promise<AuthorizationCode | Falsey>;
  saveAuthorizationCode(
    code: Pick<
      AuthorizationCode,
      'authorizationCode' | 'expiresAt' | 'redirectUri' | 'scope' | 'codeChallenge' | 'codeChallengeMethod'
    >,
    client: Client,
    user: User,
  ): Promise<AuthorizationCode | Falsey>;
  revokeAuthorizationCode(code: AuthorizationCode): Promise<boolean>;
  validateScope?(user: User, client: Client, scope?: string[]): Promise<string[] | Falsey>;
  validateRedirectUri?(redirect_uri: string, client: Client): Promise<boolean>;
}

export interface PasswordModel extends BaseModel, RequestAuthenticationModel {
  generateRefreshToken?(client: Client, user: User, scope: string[]): Promise<string>;
  getUser(username: string, password: string, client: Client): Promise<User | Falsey>;
  validateScope?(user: User, client: Client, scope?: string[]): Promise<string[] | Falsey>;
}

export interface RefreshTokenModel extends BaseModel, RequestAuthenticationModel {
  generateRefreshToken?(client: Client, user: User, scope: string[]): Promise<string>;
  getRefreshToken(refreshToken: string): Promise<RefreshToken | Falsey>;
  revokeToken(token: RefreshToken): Promise<boolean>;
}

export interface RequestAuthenticationModel {
  getAccessToken(accessToken: string): Promise<Token | Falsey>;
  verifyScope?(token: Token, scope: string[]): Promise<boolean>;
}
