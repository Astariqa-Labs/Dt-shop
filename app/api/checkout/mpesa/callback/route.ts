import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    
    // Safaricom callback body structure
    const body = payload?.Body?.stkCallback;

    if (!body) {
      return NextResponse.json({ error: 'Invalid callback payload' }, { status: 400 });
    }

    const merchantRequestId = body.MerchantRequestID;
    const checkoutRequestId = body.CheckoutRequestID;
    const resultCode = body.ResultCode;
    const resultDesc = body.ResultDesc;

    if (resultCode === 0) {
      // Payment Successful
      const callbackMetadata = body.CallbackMetadata?.Item || [];
      let mpesaReceiptNumber = '';
      let amount = 0;
      let phoneNumber = '';

      for (const item of callbackMetadata) {
        if (item.Name === 'MpesaReceiptNumber') mpesaReceiptNumber = item.Value;
        if (item.Name === 'Amount') amount = item.Value;
        if (item.Name === 'PhoneNumber') phoneNumber = item.Value;
      }

      // TODO: Update your database order status to 'PAID' here using mpesaReceiptNumber
      console.log(`Payment successful for Request ID: ${checkoutRequestId}, Receipt: ${mpesaReceiptNumber}, Amount: ${amount}`);

    } else {
      // Payment Failed or Cancelled by User
      console.log(`Payment failed for Request ID: ${checkoutRequestId}. Reason: ${resultDesc}`);
      // TODO: Update your database order status to 'FAILED' or 'CANCELLED' here
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Accepted' });
  } catch (error: any) {
    console.error('Error processing M-Pesa callback:', error);
    return NextResponse.json({ ResultCode: 1, ResultDesc: 'Internal Server Error' }, { status: 500 });
  }
}