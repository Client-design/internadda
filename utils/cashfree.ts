// utils/cashfree.ts

export interface PaymentResponse {
  order_id: string;
  payment_session_id: string;
  order_amount: number;
  order_currency: string;
  order_status: string;
  payment_link: string;
}

class CashfreePayment {
  // We now call our OWN backend API to avoid CORS and hide Secret Keys
  async createOrder(orderId: string, amount: number, customer: any): Promise<PaymentResponse> {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        orderId,
        amount,
        customer: {
          customer_id: customer.id,
          customer_email: customer.email,
          customer_phone: customer.phone,
          customer_name: customer.name
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to create payment order');
    }

    return response.json();
  }

  async verifyPayment(orderId: string): Promise<boolean> {
    const response = await fetch(`/api/verify-payment?orderId=${orderId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    const data = await response.json();
    return data.order_status === 'PAID';
  }
}

export const cashfree = new CashfreePayment();
