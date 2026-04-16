"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { Vessel } from "@/lib/ais/types";
import { parseAISMessage, buildSubscribeMessage } from "@/lib/ais/aisstream";
import { enrichKoreanContext } from "@/lib/ais/korea";

const WS_URL = "wss://stream.aisstream.io/v0/stream";
const MAX_VESSELS = 200;
const STALE_TIMEOUT = 10 * 60 * 1000;
const PING_INTERVAL = 20000; // 20초마다 ping으로 연결 유지

type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

export function useAISStream() {
  const apiKey = process.env.NEXT_PUBLIC_AISSTREAM_API_KEY;
  const wsRef = useRef<WebSocket | null>(null);
  const vesselMapRef = useRef<Map<string, Vessel>>(new Map());
  const [vessels, setVessels] = useState<Vessel[]>([]);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");
  const [lastMessageAt, setLastMessageAt] = useState<string | null>(null);

  const pruneStaleVessels = useCallback(() => {
    const now = Date.now();
    let pruned = false;
    vesselMapRef.current.forEach((v, mmsi) => {
      if (now - new Date(v.timestamp).getTime() > STALE_TIMEOUT) {
        vesselMapRef.current.delete(mmsi);
        pruned = true;
      }
    });
    if (pruned) setVessels([...vesselMapRef.current.values()].slice(0, MAX_VESSELS));
  }, []);

  useEffect(() => {
    if (!apiKey) {
      setStatus("error");
      return;
    }

    let reconnectTimer: ReturnType<typeof setTimeout>;
    let staleTimer: ReturnType<typeof setInterval>;
    let pingTimer: ReturnType<typeof setInterval>;

    function connect() {
      setStatus("connecting");
      const ws = new WebSocket(WS_URL);
      wsRef.current = ws;

      ws.onopen = () => {
        setStatus("connected");
        ws.send(buildSubscribeMessage(apiKey!));
        staleTimer = setInterval(pruneStaleVessels, 5 * 60 * 1000);
        // 20초마다 ping 전송으로 연결 유지
        pingTimer = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) ws.send("ping");
        }, PING_INTERVAL);
      };

      ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (typeof msg?.error === "string") {
            setStatus("error");
            return;
          }

          const parsed = parseAISMessage(msg);
          if (!parsed?.mmsi) return;

          const existing = vesselMapRef.current.get(parsed.mmsi);
          const merged = { ...(existing ?? {}), ...parsed } as Partial<Vessel>;
          if (merged.lat == null || merged.lng == null) return;

          const updated = enrichKoreanContext(merged as Vessel);
          vesselMapRef.current.set(parsed.mmsi, updated);
          setLastMessageAt(new Date().toISOString());

          if (vesselMapRef.current.size > MAX_VESSELS) {
            const oldest = [...vesselMapRef.current.entries()]
              .sort((a, b) => new Date(a[1].timestamp).getTime() - new Date(b[1].timestamp).getTime())[0];
            vesselMapRef.current.delete(oldest[0]);
          }

          setVessels([...vesselMapRef.current.values()]);
        } catch {
          // 파싱 실패 무시
        }
      };

      ws.onerror = () => setStatus("error");

      ws.onclose = () => {
        setStatus("disconnected");
        clearInterval(staleTimer);
        clearInterval(pingTimer);
        reconnectTimer = setTimeout(connect, 5000);
      };
    }

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      clearInterval(staleTimer);
      clearInterval(pingTimer);
      wsRef.current?.close();
    };
  }, [apiKey, pruneStaleVessels]);

  return {
    vessels,
    total: vessels.length,
    status,
    lastMessageAt,
  };
}
