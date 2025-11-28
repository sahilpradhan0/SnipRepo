// import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

// serve(async (req) => {
//   const { email } = await req.json();
//   const KIT_API_KEY = Deno.env.get("KIT_API_KEY");

//   const SAAS_NAME = "SnipRepo";
//   const formId = "8595333"; // waitlist form
//   const tagId = 11001934;   // waitlist tag

//   const res = await fetch(`https://api.convertkit.com/v3/forms/${formId}/subscribe`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({
//       api_key: KIT_API_KEY,
//       email,
//       fields: { saasName: SAAS_NAME },
//       tags: [tagId],
//     }),
//   });

//   const data = await res.json();

//   return new Response(JSON.stringify(data), {
//     headers: { "Content-Type": "application/json" },
//   });
// });

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

serve(async (req) => {
  const KIT_API_KEY = Deno.env.get("KIT_API_KEY");

  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  console.log("🔥 Function invoked:", req.method, new Date().toISOString());
  console.log("KIT_API_KEY loaded:", !!KIT_API_KEY);

  // CORS Preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: corsHeaders }
    );
  }

  try {
    const { email, product } = await req.json();
    console.log("📩 Email received:", email);

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // Your new SnipRepo waitlist details
    const formId = "8799609";
    const tagId = 12779963;

    const response = await fetch(
      `https://api.convertkit.com/v3/forms/${formId}/subscribe`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          api_key: KIT_API_KEY,
          email,
          tags: [tagId],
          fields: product ? { product } : undefined,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("❌ ConvertKit Error:", data);
      return new Response(
        JSON.stringify({ error: data }),
        { status: 500, headers: corsHeaders }
      );
    }

    return new Response(
      JSON.stringify({ message: "Subscribed successfully!" }),
      { status: 200, headers: corsHeaders }
    );

  } catch (err) {
    console.error("🔥 Edge Function Error:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: corsHeaders }
    );
  }
});
