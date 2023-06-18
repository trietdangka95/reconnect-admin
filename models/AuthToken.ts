

export type DecodedToken = {
  readonly exp: number;
  readonly iat: number;
  readonly iss: string;
  readonly sub: string;

  readonly email: string;
  readonly name: string;
  readonly typ: RolesDTO[];
};

export class AuthToken {
  readonly decodedToken: DecodedToken;

  constructor(readonly token?: string) {
    this.decodedToken = {} as DecodedToken;
    const jwtDecode = (token : string)=> {
      if (!token) { return; }
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
  }
    try {
      if (token) this.decodedToken = jwtDecode(token);
    } catch (err) {
      console.error('JWT decode get error', err);
    }
  }

  get expiresAt(): Date {
    return new Date(this.decodedToken.exp * 1000);
  }

  get isExpired(): boolean {
    return this.expiresAt && new Date() < this.expiresAt;
  }

  get isAuthenticated(): boolean {
    return this.isExpired && !!this.token;
  }

  get authorizationString(): string {
    return `${this.token}`;
  }
}

export interface LoginForm {
  UserName: string;
  Password: string;
}
export interface RolesDTO {
  RoleName: string;
  ClientId: string;
}
export interface UserProfiles {
  UserId: string;
  Username: string;
  FullName: string;
  Email: string;
  Roles: RolesDTO[];
}
export interface InvitationCode {
  code: string;
}
