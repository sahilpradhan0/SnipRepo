export interface MessagePayload {
  name: string;
  email: string;
  message: string;
  user_agent?: string;
  ip_address?: string | null;
}

export const messagesApi = {
  async create(payload: MessagePayload) {
    const res = await fetch(
      "https://ahkpwcszyshvluomingr.functions.supabase.co/contact_message",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    let json;
    try {
      json = await res.json();
      console.log(json);
      
    } catch {
      throw new Error("Invalid JSON response from server");
    }

    if (!res.ok) {
      console.error("Edge function error:", json);
      throw new Error(json.error || "Something went wrong");
    }

    return json; // optionally return response data
  },
};
