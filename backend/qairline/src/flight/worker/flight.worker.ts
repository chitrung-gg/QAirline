// flight.worker.ts
import { parentPort } from 'worker_threads';
import { Flight } from '../entity/flight.entity';

// Simulate flight data processing (for example, calculating duration)
const processFlights = (flights: Flight[]) => {
  return flights.map((flight) => {
    const departureTime = new Date(flight.departureTime);
    const arrivalTime = new Date(flight.arrivalTime);
    const duration = (arrivalTime.getTime() - departureTime.getTime()) / 1000 / 60; // duration in minutes
    flight.duration = duration;
    return flight;
  });
};

// Listen for messages from the main thread
parentPort?.on('message', (data) => {
  if (data.flights) {
    const processedFlights = processFlights(data.flights);
    parentPort?.postMessage({ processedFlights });
  }

  parentPort?.close()
});
