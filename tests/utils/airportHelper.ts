import { request } from '@playwright/test';

export async function createAirport(airportData: any, token: string) {
  const apiContext = await request.newContext({
    baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}:${process.env.NEXT_PUBLIC_BACKEND_PORT}`,
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
