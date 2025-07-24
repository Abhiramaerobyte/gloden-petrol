import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    
    // Log the webhook event
    console.log('Webhook triggered:', payload);
    
    // Here you can add logic to send notifications to external systems
    // For example, sending to n8n, email notifications, etc.
    
    // Example: Send to external webhook URL (if configured)
    const webhookUrl = process.env.EXTERNAL_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...payload,
            source: 'golden-petrol-admin',
          }),
        });
      } catch (error) {
        console.error('Failed to send external webhook:', error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}