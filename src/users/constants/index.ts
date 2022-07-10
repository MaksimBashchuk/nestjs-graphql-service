export const AUTH = {
  TOKEN: '',
};

export const BASE_USER_URL =
  process.env.USERS_URL || 'http://localhost:3004/v1/users';

export const REGISTER_URL = `${BASE_USER_URL}/register`;
export const GET_TOKEN_URL = `${BASE_USER_URL}/login`;
