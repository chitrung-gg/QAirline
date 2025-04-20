import { request } from '@playwright/test';

export async function createAirport(airportData: any, token: string) {
  const apiContext = await request.newContext({
    baseURL: 'http://localhost:5000',
    extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
    },
  });

  const response = await apiContext.post('/airport', {
    data: airportData,
  });

  const body = await response.json();
  return { status: response.status(), body };
}
