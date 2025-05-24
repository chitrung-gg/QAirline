import { APIRequestContext, request } from '@playwright/test';
import * as dotenv from 'dotenv';
import { jwtDecode } from 'jwt-decode';

dotenv.config();

export interface DecodedToken {
    id: string;
    username: string;
    email: string;
    role: 'User' | 'Admin';
    iat?: number;
    exp?: number;
}

export async function getAnonymousContext(): Promise<APIRequestContext> {
    return await request.newContext({
      baseURL: `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}`,
    });
}

export async function loginAs(role: 'Admin' | 'User') {
  const apiContext = await request.newContext({
    baseURL: `${process.env.BACKEND_URL}:${process.env.BACKEND_PORT}`,
  });

  const credentials =
    role === 'Admin'
      ? { email: process.env.ADMIN_EMAIL, password: process.env.ADMIN_PASSWORD }
      : { email: process.env.USER_EMAIL, password: process.env.USER_PASSWORD };

  const response = await apiContext.post('/authentication/login', {
    data: credentials,
  });

  const body = await response.json();
  const token = body.user.accessToken;
  const decoded = jwtDecode<DecodedToken>(token);

  return { token, decoded };
}