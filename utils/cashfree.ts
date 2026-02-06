// utils/cashfree.ts
import { loadEnv } from './env';

const env = loadEnv();

export interface PaymentResponse {
  order_id: string;
  payment_session_id: string;
  order_amount: number;
  order_currency: string;
  order_status: string;
  payment_link: string;
}

export interface CashfreeConfig {
  clientId: string;
  clientSecret: string;
  apiEndpoint: string;
}

class CashfreePayment {
  private config: CashfreeConfig;
  
  constructor() {
    this.config = {
      clientId: env.VITE_CASHFREE_CLIENT_ID,
      clientSecret: env.VITE_CASHFREE_CLIENT_SECRET,
      apiEndpoint: env.VITE_CASHFREE_MODE === 'PRODUCTION' 
        ? 'https://api.cashfree.com/pg' 
        : 'https://sandbox.cashfree.com/pg'
    };
  }

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-api-version': '2022-09-01',
      'x-client-id': this.config.clientId,
      'x-client-secret': this.config.clientSecret,
    };
  }

  async createOrder(orderId: string, amount: number, customer: any): Promise<PaymentResponse> {
    const response = await fetch(`${this.config.apiEndpoint}/orders`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify({
        order_id: orderId,
        order_amount: amount,
        order_currency: 'INR',
        order_note: 'Internship Application Fee',
        customer_details: {
          customer_id: customer.id,
          customer_email: customer.email,
          customer_phone: customer.phone,
          customer_name: customer.name
        },
        order_meta: {
          return_url: `${window.location.origin}/payment-success?order_id=${orderId}`
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to create payment order');
    }

    return response.json();
  }

  async verifyPayment(orderId: string): Promise<boolean> {
    const response = await fetch(`${this.config.apiEndpoint}/orders/${orderId}`, {
      method: 'GET',
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new Error('Failed to verify payment');
    }

    const data = await response.json();
    return data.order_status === 'PAID';
  }
}

export const cashfree = new CashfreePayment();
