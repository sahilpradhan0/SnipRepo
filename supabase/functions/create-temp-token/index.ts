import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { create, getNumericDate } from "https://deno.land/x/djwt@v2.8/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { temp_id } = await req.json();

    if (!temp_id) {
      return new Response(JSON.stringify({ error: "temp_id missing" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Edge Function Code (TEMPORARILY ADD THIS)
    const jwtSecret = Deno.env.get("JWT_SECRET");
    console.log("Secret length:", jwtSecret?.length);
    // ... rest of the function

    if (!jwtSecret) {
      return new Response(JSON.stringify({ error: "JWT secret missing" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Edge Function Code:
    // Edge Function Code:
    const header = { alg: "HS256", typ: "JWT" };
    const payload = {
      temp_id,
      role: "anon",
      exp: getNumericDate(60 * 60 * 24 * 5),
    };

    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(jwtSecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"],
    );

    const token = await create(header, payload, key);

    return new Response(JSON.stringify({ token }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err?.message || "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
