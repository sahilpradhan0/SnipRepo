// v1,whsec_B159vSODQMIkhkr0hnUAcC8v0rXAFUHDJB03jJMRQARayEXSGCrNE4mGuzaOW7lmL/0ZW+WIiBow0sVT


import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Webhook } from "https://esm.sh/standardwebhooks@1";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

const hookSecret = Deno.env.get("HOOK_SECRET")!;  // You'll set this in function secrets

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const payload = await req.text();
  const headers = Object.fromEntries(req.headers.entries());

  let verifiedPayload;
  try {
    const wh = new Webhook(hookSecret);
    verifiedPayload = wh.verify(payload, headers);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return new Response("Unauthorized", { status: 401 });
  }

  const event = verifiedPayload as any;
  const tempId = event.user_metadata?.migrate_temp_id;
  const userId = event.user_id;  // This is available in Before User Created hook

  if (!tempId || !userId) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  console.log(`Migrating temp snippets for temp_id ${tempId} to user ${userId}`);

  const { error } = await supabase
    .from("temp_snippets")
    .update({
      pending_user_id : userId,
      migrated_at: new Date().toISOString(),
    })
    .eq("temp_id", tempId)
    .is("pending_user_id ", null);

  if (error) console.error("Migration error:", error);

  return new Response(JSON.stringify({ success: true }), { status: 200 });
});
