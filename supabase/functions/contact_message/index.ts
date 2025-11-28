import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const supabaseUrl = Deno.env.get("SUPABASE_URL");

function corsResponse(body: string | null, init: ResponseInit = {}) {
  return new Response(body, {
    ...init,
    headers: {
      "Access-Control-Allow-Origin": "*", // replace * with your frontend URL in production for security
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return corsResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return corsResponse(JSON.stringify({ error: "Method not allowed" }), { status: 405 });
  }

  try {
    if (!serviceRoleKey || !supabaseUrl) {
      return corsResponse(
        JSON.stringify({ error: "Missing Supabase environment variables" }),
        { status: 500 }
      );
    }

    const ip = req.headers.get("x-forwarded-for") ?? "unknown";

    const body = await req.json().catch(() => null);
    if (!body || !body.name || !body.email || !body.message) {
      return corsResponse(JSON.stringify({ error: "Invalid payload." }), { status: 400 });
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const { error } = await supabase.from("messages").insert({
      name: body.name,
      email: body.email,
      message: body.message,
      ip_address: ip,
      user_agent: req.headers.get("user-agent") ?? null,
    });

    if (error) throw error;

    return corsResponse(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    return corsResponse(JSON.stringify({ error: (err as Error).message }), { status: 500 });
  }
});
