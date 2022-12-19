export interface UserInfo {
  username: string;
  firstName: string;
  lastName: string;
}

export interface UserListItem {
  id: number;
  lastName: string;
  firstName: string;
}

export interface Tokens {
  access: string;
  refresh: string;
}
