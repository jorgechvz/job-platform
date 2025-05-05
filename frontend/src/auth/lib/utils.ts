import { jwtDecode } from "jwt-decode";

const ACCESS_TOKEN_KEY = "access_token";

export const saveUserToLocalStorage = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export interface DecodedJwtPayload {
  email: string;
  role: string;
  iat: number;
  exp: number;
  userId: string;
  name: string;
}

export const decodeToken = (): DecodedJwtPayload | null => {
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return null;
    }
    return jwtDecode<DecodedJwtPayload>(token);
  } catch (error) {
    console.error("Invalid token", error);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    return null;
  }
};
