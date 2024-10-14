
export interface UserLogin {
  login: any;
  password: any;
}

export interface UserLoginResponse {
  access_token: string;
  // refresh_token: string;
}

// export interface GoogleAuth {
//   expires_at: number,
//   gmail_access_token: string,
// }

export interface GoogleAuth {
  code?: string
  redirect_uri?: string,
  expires_at?: number,
  gmail_access_token?: string
}

export interface User {
  email: string,
  login: string,
  password?: string,
  role_id: number // 0
  username: string
}

export type UserList = [
  {
    email: string,
    role_id: number,
    username: string
  }
] | [];