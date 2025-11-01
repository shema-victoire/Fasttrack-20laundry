import { RequestHandler } from "express";

interface BookingRequest {
  name: string;
  phone: string;
  address: string;
  serviceType: string;
  pickupDate: string;
}

interface BookingResponse {
  success: boolean;
  message: string;
  bookingId?: string;
  error?: string;
}

export const handleBooking: RequestHandler = async (
  req,
  res,
): Promise<void> => {
  try {
    const { name, phone, address, serviceType, pickupDate } =
      req.body as BookingRequest;

    if (!name || !phone || !address || !serviceType || !pickupDate) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
        error: "Missing required fields",
      } as BookingResponse);
      return;
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioPhone = process.env.TWILIO_WHATSAPP_PHONE;
    const ownerPhone = process.env.OWNER_WHATSAPP_PHONE;

    if (!accountSid || !authToken || !twilioPhone || !ownerPhone) {
      console.error("Missing Twilio configuration");
      res.status(500).json({
        success: false,
        message: "Server configuration error",
        error: "Missing Twilio credentials",
      } as BookingResponse);
      return;
    }

    const bookingMessage = `🚀 NEW BOOKING FROM LAUNDRYPRO\n\n👤 Customer Name: ${name}\n📞 Phone: ${phone}\n📍 Address: ${address}\n🧺 Service: ${serviceType}\n📅 Preferred Pickup: ${pickupDate}`;

    const auth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          From: `whatsapp:${twilioPhone}`,
          To: `whatsapp:${ownerPhone}`,
          Body: bookingMessage,
        }).toString(),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Twilio error:", errorData);
      res.status(500).json({
        success: false,
        message: "Failed to send booking notification",
        error: errorData.message || "Twilio API error",
      } as BookingResponse);
      return;
    }

    const data = (await response.json()) as { sid?: string };
    const bookingId = data.sid || `BOOKING-${Date.now()}`;

    res.json({
      success: true,
      message:
        "Booking received! You will receive a confirmation WhatsApp message shortly.",
      bookingId,
    } as BookingResponse);
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your booking",
      error: error instanceof Error ? error.message : "Unknown error",
    } as BookingResponse);
  }
};
