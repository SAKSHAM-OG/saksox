/**
 * RAZORPAY ORDER CREATION ENDPOINT
 * Cloudflare Pages Function — Secure Backend
 *
 * Requirements:
 * - RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set as Cloudflare
 *   Pages Secrets (not in code, not in logs)
 * - This endpoint only works with TEST MODE (razorpay_test_* keys)
 * - Production (live) keys must NOT be configured here
 *
 * Request: POST /api/create-order
 *   Body: { amount: number }  — amount in INR (e.g., 4999 = ₹4,999)
 *
 * Response: { success: true, order_id: string, currency: string, amount: number }
 *
 * Security Notes:
 * - RAZORPAY_KEY_SECRET is NEVER exposed to the frontend or logs
 * - All Razorpay API calls use server-side credentials
 * - amount is validated server-side (must be positive, INR currency)
 */

export interface Env {
  RAZORPAY_KEY_ID: string;
  RAZORPAY_KEY_SECRET: string;
}

interface CreateOrderRequest {
  amount: number;
  currency?: string;
  receipt?: string;
}

interface RazorpayOrderResponse {
  id: string;
  entity: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  theme: {
    header: string;
  };
}

interface ErrorResponse {
  success: false;
  error: string;
  code?: string;
}

/**
 * Convert INR amount to Razorpay paise (multiply by 100)
 */
function toPaise(amount: number): number {
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Invalid amount: must be a positive number');
  }
  // Round to nearest integer paise (handle floating point precision)
  return Math.round(amount * 100);
}

/**
 * Create a Razorpay order (server-side)
 */
async function createRazorpayOrder(
  amountInPaise: number,
  currency: string,
  receipt: string,
  env: Env
): Promise<RazorpayOrderResponse> {
  const response = await fetch('https://api.razorpay.com/v1/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // Basic auth: "key_id:key_secret" base64-encoded
      // NOTE: key_secret comes from env, NEVER logged or exposed
      'Authorization': `Basic ${btoa(`${env.RAZORPAY_KEY_ID}:${env.RAZORPAY_KEY_SECRET}`)}`,
    },
    body: JSON.stringify({
      amount: amountInPaise,
      currency: currency || 'INR',
      receipt: receipt || `saksox-${Date.now()}`,
      payment_capture: 1, // Auto-capture payment
      // Theme for test mode
      theme: {
        header: 'SAKSOX',
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    const errorMsg =
      errorBody.description ||
      `Razorpay API error: ${response.status} ${response.statusText}`;
    throw new Error(`Razorpay order creation failed: ${errorMsg}`);
  }

  return await response.json();
}

export async function onRequestPost(
  context: {
    request: Request;
    env: Env;
    next?: Request;
  }
): Promise<Response> {
  // Handle POST only
  if (context.request.method !== 'POST') {
    return new Response(
      JSON.stringify({ success: false, error: 'Method not allowed. Use POST.' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  try {
    // Parse request body
    const rawBody = await context.request.text();
    let payload: CreateOrderRequest;

    try {
      payload = JSON.parse(rawBody);
    } catch {
      return new Response(
        JSON.stringify({ success: false, error: 'Invalid JSON body' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate required fields
    if (!payload.amount || typeof payload.amount !== 'number') {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing or invalid "amount" field. Amount must be a number (INR).',
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Validate amount (server-side, as required)
    const amountInPaise = toPaise(payload.amount);

    const currency = payload.currency || 'INR';
    const receipt = payload.receipt || `saksox-${Date.now()}`;

    if (!currency || typeof currency !== 'string') {
      return new Response(
        JSON.stringify({ success: false, error: 'Missing or invalid "currency" field.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Call Razorpay API server-side (secret stays in env, never exposed)
    const razorpayOrder = await createRazorpayOrder(
      amountInPaise,
      currency,
      receipt,
      context.env
    );

    return new Response(
      JSON.stringify({
        success: true,
        order_id: razorpayOrder.id,
        currency: razorpayOrder.currency,
        amount: razorpayOrder.amount,
        receipt: razorpayOrder.receipt,
        status: razorpayOrder.status,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );

  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('[create-order] Error:', message);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: message,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
