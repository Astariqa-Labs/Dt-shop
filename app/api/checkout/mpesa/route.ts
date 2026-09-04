import { NextResponse } from 'next/server';

// Helper to generate Safaricom Daraja access token
async function getMpesaAccessToken() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  
  if (!consumerKey || !consumerSecret) {
    throw new Error('M-Pesa credentials not configured.');
  }

  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');

  const response = await fetch(
    'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    }
  );

  const data = await response.json();
  return data.access_token;
}

export async function POST(request: Request) {
  try {
    const { items, phoneNumber, totalAmount } = await request.json();

    if (!phoneNumber || !totalAmount) {
      return NextResponse.json(
        { error: 'Phone number and total amount are required.' },
        { status: 400 }
      );
    }

    const accessToken = await getMpesaAccessToken();
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, '')
      .slice(0, 14);

    const shortCode = process.env.MPESA_SHORTCODE || '174379'; // Sandbox default
    const passkey = process.env.MPESA_PASSKEY || '';
    const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64');

    const stkResponse = await fetch(
      'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          BusinessShortCode: shortCode,
          Password: password,
          Timestamp: timestamp,
          TransactionType: 'CustomerPayBillOnline',
          Amount: totalAmount,
          PartyA: phoneNumber,
          PartyB: shortCode,
          PhoneNumber: phoneNumber,
          CallBackURL: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'}/api/checkout/mpesa/callback`,
          AccountReference: 'DeuteronomyShop',
          TransactionDesc: 'Payment for Clarks Footwear Order',
        }),
      }
    );

    const stkData = await stkResponse.json();

    if (stkData.ResponseCode === '0') {
      return NextResponse.json({
        success: true,
        message: 'STK push successfully sent.',
        checkoutRequestId: stkData.CheckoutRequestID,
      });
    } else {
      return NextResponse.json(
        { error: stkData.errorMessage || 'Failed to initiate M-Pesa STK push.' },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal server error processing payment.' },
      { status: 500 }
    );
  }
}