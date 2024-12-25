"use client";

import {
  sendGAEvent,
  // sendGTMEvent
} from "@next/third-parties/google";
import * as Sentry from "@sentry/nextjs";

export const reportEvent = (event: any, properties: Record<string, any>) => {
  sendGAEvent("event", event + "_" + properties.value, properties);
  Sentry.captureMessage(
    event + "_" + properties.value,
    properties.type || "info",
  );
  //   sendGTMEvent({ event, value: properties });
};

export const reportError = (error: any) => {
  Sentry.captureException(error);
};
