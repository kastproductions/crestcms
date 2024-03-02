"use client";

import React from "react";
export function useCrestCMS(websiteUrl?: string) {
  React.useEffect(() => {
    // @ts-ignore
    const messageHandler = (event) => {
      // if (event.origin !== "http://localhost:3000") return;
      const { action, value } = event.data;
      if (!action || !value) return;
      if (typeof window === "undefined") return;
      var element = window.document.querySelector(`[data-crest-id="${action}"]`);
      if (element) element.textContent = value;
    };
    window.addEventListener("message", messageHandler);
    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);
}

export function CrestCMS({ websiteUrl }: { websiteUrl?: string }) {
  useCrestCMS(websiteUrl);
  return null;
}
