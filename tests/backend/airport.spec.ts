import { test, expect, request } from '@playwright/test';
import { jwtDecode } from 'jwt-decode'
import { createAirport } from '../utils/airportHelper';
import { getAnonymousContext, loginAs } from '../utils/authenticationHelper';

test.describe('Airport API - Anonymous - Component', () => {
    let token: string;

    test.beforeAll('Anonymous Context', async () => {
        const context = await getAnonymousContext();
        token = ""

        const response = await context.post('/authentication');
        expect(response.status()).toBe(401); // 200 if logged in, 401 if unauthorized
    })

    test.describe('Create Airport', () => {
        test('Duplicate Airport Name', async() => {
            const airportData = {
                name: "Sân bay quốc tế Nội Bài",
                city: "Hà Nội",
                country: "Việt Nam",
                iataCode: "HAN1"
            };
            
            const { status, body } = await createAirport(airportData, token);
            console.log(body)       // Debug

            expect(status).toBe(401) 
            expect(body.message).toContain('Unauthorized')
        })

        test('Null Airport Attributes', async() => {
            const airportData = {
                name: "Sân bay quốc tế Nội Bài",
                city: null,
                country: null,
                iataCode: "HAN1"
            };
            
            const { status, body } = await createAirport(airportData, token);
            console.log(body)       // Debug

            const expectedMessages = [
                'name must be a string',
                'city must be a string',
                'country must be a string',
                'iataCode must be a string'
            ];
              
            const actualMessages = body.message;
            const matched = expectedMessages.some(msg => actualMessages.includes(msg));

            expect(status).toBe(401) 
            expect(body.message).toContain('Unauthorized')
        })

        test('Empty Airport Attributes', async() => {
            const airportData = {
                name: "",
                city: "",
                country: "",
                iataCode: ""
            };
            
            const { status, body } = await createAirport(airportData, token);
            console.log(body)       // Debug

            expect(status).toBe(401) 
            expect(body.message).toContain('Unauthorized')
        })
    })
});

test.describe('Airport API - User - Component', () => {
    let token: string;

    test.beforeAll('User Context', async () => {
        const response = await loginAs('User');
        token = response.token
        expect(response.decoded.role).toBe('User');
        expect(response.decoded.email).toBeDefined();
    })

    test.describe('Create Airport', () => {
        test('Duplicate Airport Name', async() => {
            const airportData = {
                name: "Sân bay quốc tế Nội Bài",
                city: "Hà Nội",
                country: "Việt Nam",
                iataCode: "HAN1"
            };
            
            const { status, body } = await createAirport(airportData, token);
            console.log(body)       // Debug

            expect(status).toBe(403) 
            expect(body.message).toContain('Forbidden')
        })

        test('Null Airport Attributes', async() => {
            const airportData = {
                name: "Sân bay quốc tế Nội Bài",
                city: null,
                country: null,
                iataCode: "HAN1"
            };
            
            const { status, body } = await createAirport(airportData, token);
            console.log(body)       // Debug

            const expectedMessages = [
                'name must be a string',
                'city must be a string',
                'country must be a string',
                'iataCode must be a string'
            ];
              
            const actualMessages = body.message;
            const matched = expectedMessages.some(msg => actualMessages.includes(msg));

            expect(status).toBe(403) 
            expect(body.message).toContain('Forbidden')
        })

        test('Empty Airport Attributes', async() => {
            const airportData = {
                name: "",
                city: "",
                country: "",
                iataCode: ""
            };
            
            const { status, body } = await createAirport(airportData, token);
            console.log(body)       // Debug

            expect(status).toBe(403) 
            expect(body.message).toContain('Forbidden')
        })
    })

});

test.describe('Airport API - Admin - Component', () => {
    let token: string;

    test.beforeAll('Admin Context', async () => {
        const response = await loginAs('Admin');
        token = response.token
        expect(response.decoded.role).toBe('Admin');
        expect(response.decoded.email).toBeDefined();
    })

    test.describe('Create Airport', () => {
        test('Duplicate Airport Name', async() => {
            const airportData = {
                name: "Sân bay quốc tế Nội Bài",
                city: "Hà Nội",
                country: "Việt Nam",
                iataCode: "HAN1"
            };
            
            const { status, body } = await createAirport(airportData, token);
            console.log(body)       // Debug

            expect(status).toBe(400) 
            expect(body.message).toContain('Airport with the same name already created!')
        })

        test('Null Airport Attributes', async() => {
            const airportData = {
                name: "Sân bay quốc tế Nội Bài",
                city: null,
                country: null,
                iataCode: "HAN1"
            };
            
            const { status, body } = await createAirport(airportData, token);
            console.log(body)       // Debug

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
        })

        test('Empty Airport Attributes', async() => {
            const airportData = {
                name: "",
                city: "",
                country: "",
                iataCode: ""
            };
            
            const { status, body } = await createAirport(airportData, token);
            console.log(body)       // Debug

            expect(status).toBe(400) 
            expect(body).toContain('Attribute(s) has empty value')
        })
    })

});


