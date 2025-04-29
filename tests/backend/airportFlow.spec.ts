import { test, expect, request } from '@playwright/test';
import { jwtDecode } from 'jwt-decode';
import { createAirport } from '../utils/airportHelper';
import { getAnonymousContext, loginAs } from '../utils/authenticationHelper';

// Updated airportHelper based on the CFG diagram
// async function createAirport(airportData: {
//   name: string;
//   city: string;
//   country: string;
//   iataCode: string;
// }, token: string) {
//   const apiContext = await request.newContext({
//     extraHTTPHeaders: token ? {
//       'Authorization': `Bearer ${token}`
//     } : {}
//   });

//   const response = await apiContext.post('/airports', {
//     data: airportData,
//   });

//   return {
//     status: response.status(),
//     body: await response.json().catch(() => response.text())
//   };
// }

test.describe('Airport API Tests - Based on CFG', () => {
  test.describe('Anonymous User', () => {
    let token: string;

    test.beforeAll('Anonymous Context', async () => {
      const context = await getAnonymousContext();
      token = "";

      const response = await context.post('/authentication');
      expect(response.status()).toBe(401);
    });

    test('Cannot create airport - Unauthorized', async () => {
      const airportData = {
        name: "Sân bay quốc tế Nội Bài",
        city: "Hà Nội",
        country: "Việt Nam",
        iataCode: "HAN"
      };
      
      const { status, body } = await createAirport(airportData, token);
      
      expect(status).toBe(401);
      expect(body.message).toContain('Unauthorized');
    });
  });

  test.describe('Regular User', () => {
    let token: string;

    test.beforeAll('User Context', async () => {
      const response = await loginAs('User');
      token = response.token;
      expect(response.decoded.role).toBe('User');
    });

    test('Cannot create airport - Forbidden', async () => {
      const airportData = {
        name: "Sân bay quốc tế Nội Bài",
        city: "Hà Nội",
        country: "Việt Nam",
        iataCode: "HAN"
      };
      
      const { status, body } = await createAirport(airportData, token);
      
      expect(status).toBe(403);
      expect(body.message).toContain('Forbidden');
    });
  });

  test.describe('Admin User', () => {
    let token: string;

    test.beforeAll('Admin Context', async () => {
      const response = await loginAs('Admin');
      token = response.token;
      expect(response.decoded.role).toBe('Admin');
    });

    test('Duplicate airport name', async () => {
      const airportData = {
        name: "Sân bay quốc tế Nội Bài",
        city: "Hà Nội",
        country: "Việt Nam",
        iataCode: "HAN"
      };
      
      const { status, body } = await createAirport(airportData, token);
      
      expect(status).toBe(400);
      expect(body.message).toContain('Airport with the same name already exist');
    });

    test('Null values', async () => {
        const airportData = {
          name: "Sân bay quốc tế Nội Bài",
          city: "Hà Nội",
          country: "Việt Nam",
          iataCode: null
        };
        
        const { status, body } = await createAirport(airportData, token);

        const expectedMessages = [
            'name must be a string',
            'city must be a string',
            'country must be a string',
            'iataCode must be a string'
            ];
        
        const actualMessages = body.message;
        const matched = expectedMessages.some(msg => actualMessages.includes(msg));
      
        expect(status).toBe(400) 
        expect(matched).toBe(true);
    });

    test('Empty values', async () => {
      const airportData = {
        name: "",
        city: "Hà Nội",
        country: "Việt Nam",
        iataCode: "HAN"
      };
      
      const { status, body } = await createAirport(airportData, token);
      
      expect(status).toBe(400);
      expect(body.message).toContain('Exception found in AirportService');
    });

    test('Valid airport creation', async () => {
      const airportData = {
        name: "Sân bay quốc tế Tân Sơn Nhất",
        city: "Hồ Chí Minh",
        country: "Việt Nam",
        iataCode: "SG"
      };
      
      const { status, body } = await createAirport(airportData, token);
      
      expect(status).toBe(201);
      expect(body).toHaveProperty('id');
    });
  });
});