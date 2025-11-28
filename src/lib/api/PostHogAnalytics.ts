import posthog from "posthog-js";

export const track = (event: string, properties: Record<string, any> = {}) => {
  posthog.capture(event, properties);
};

export const identifyUser = (user: { id: string; email?: string }) => {
  posthog.identify(user.id, {
    email: user.email,
  });
};
