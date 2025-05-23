export type LoginData = {
  email: string;
  password: string;
};

export type RegisterData = {
  username: string;
  email: string;
  password: string;
};

export type JwtResponse = {
  access_token: string;
};

export type JwtPayload = {
  exp: number;
  sub: string;
  role: string;
};
