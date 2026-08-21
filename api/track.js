export default async function handler(request) {
  // Allow the browser to call this API
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json"
  };

  // Handle browser preflight request
  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers });
  }

  // Only accept POST
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({
        success: false,
        error: "Only POST requests are supported."
      }),
      { status: 405, headers }
    );
  }

  try {
    const body = await request.json();

    const carrier = body.carrier;
    const trackingNumber = body.trackingNumber;

    if (!carrier || !trackingNumber) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Carrier and tracking number are required."
        }),
        { status: 400, headers }
      );
    }

    /*
      Temporary response.

      This proves that the website can communicate
      with the backend.

      We will replace this section with the actual
      OOCL/COSCO/HMM querying logic next.
    */

    return new Response(
      JSON.stringify({
        success: true,
        carrier: carrier,
        trackingNumber: trackingNumber.toUpperCase(),
        status: "BACKEND_CONNECTED",
        statusLabel: "Backend connected",
        message: "The shipping tracker backend received your request.",
        events: []
      }),
      { status: 200, headers }
    );

  } catch (error) {

    return new Response(
      JSON.stringify({
        success: false,
        error: "Unable to process tracking request."
      }),
      { status: 500, headers }
    );
  }
}
