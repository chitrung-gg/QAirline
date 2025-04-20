import { test, expect, request } from '@playwright/test';
import { jwtDecode } from 'jwt-decode'
import { getAnonymousContext, loginAs } from '../utils/authenticationHelper';
import * as dotenv from 'dotenv';
dotenv.config(); 

test.describe('Admin Authentication Status', () => {
    // let response: any;
    // let token: string;
    // let decoded: any;
    // let context: any;

    // test.beforeAll('Setup shared API connection', async () => {
    //     context = await request.newContext({
    //         baseURL: 'http://localhost:5000',
    //     });
    // })

    test('Not Logged In', async () => {
        const context = await getAnonymousContext();

        const response = await context.post('/authentication');
        expect(response.status()).toBe(401); // 200 if logged in, 401 if unauthorized
    });

    test('Is User', async () => {
        const {token, decoded} = await loginAs('User');

        expect(decoded.role).toBe('User');
        expect(decoded.email).toBeDefined();
    });

    test('Is Admin', async () => {
        const {token, decoded} = await loginAs('Admin');

        expect(decoded.role).toBe('Admin');
        expect(decoded.email).toBeDefined();
    });
});

