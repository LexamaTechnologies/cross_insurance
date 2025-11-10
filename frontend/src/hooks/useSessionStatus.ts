"use client";

import { useCallback, useEffect, useState } from "react";

import { config } from "@/lib/config";

export type SessionPayload = {
  authenticated: boolean;
  username: string | null;
  is_staff: boolean;
};

const DEFAULT_SESSION: SessionPayload = {
  authenticated: false,
  username: null,
  is_staff: false,
};

export function useSessionStatus(autoFetch = true) {
  const [session, setSession] = useState<SessionPayload>(DEFAULT_SESSION);

  const fetchSession = useCallback(
    async (signal?: AbortSignal) => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/auth/session/`, {
          credentials: "include",
          cache: "no-store",
          signal,
        });

        if (response.ok) {
          const payload = (await response.json()) as SessionPayload;
          setSession(payload);
        } else if (response.status === 401) {
          setSession(DEFAULT_SESSION);
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Session status fetch failed", error);
        }
      }
    },
    [],
  );

  useEffect(() => {
    if (!autoFetch) return;
    const controller = new AbortController();
    fetchSession(controller.signal);
    return () => controller.abort();
  }, [autoFetch, fetchSession]);

  return { session, setSession, fetchSession };
}
