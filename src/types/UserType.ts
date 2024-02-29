export type UserData = {
  id: number;
  username: string;
  email: string;
  password: string;
};

export type UserFromData = {
  username?: string;
  password?: string;
  email?: string;
};
