import { parentPort } from 'worker_threads';

const calculateFinalPrice = (ticketPrice: Record<string, number>, promotion: any) => {
  let finalPrice = { ...ticketPrice };

  // Apply promotion discount
  if (promotion) {
    if (promotion.discountType === 'Percentage') {
      // Apply percentage discount to each ticket price
      for (const classType in finalPrice) {
        finalPrice[classType] -= ((finalPrice[classType] * promotion.discount) / 100);
      }
    } else if (promotion.discountType === 'FixedAmount') {
      // Apply fixed discount to each ticket price
      for (const classType in finalPrice) {
        finalPrice[classType] -= promotion.discount;
        // Ensure the price doesn't go below zero
        finalPrice[classType] = Math.max(finalPrice[classType], 0);
      }
    }
  }

  return finalPrice;
};

parentPort?.on('message', (data) => {
  if (data.ticketPrice && data.promotion) {
    const result = calculateFinalPrice(data.ticketPrice, data.promotion);
    parentPort?.postMessage(result);
  }
});
