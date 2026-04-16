"use client";

import useSWR from "swr";
import type { VesselApiResponse } from "@/lib/ais/types";
import { VESSEL_POLL_INTERVAL } from "@/lib/utils/constants";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useVessels() {
  const { data, error, isLoading } = useSWR<VesselApiResponse>(
    "/api/vessels",
    fetcher,
    {
      refreshInterval: VESSEL_POLL_INTERVAL,
      revalidateOnFocus: false,
    }
  );

  return {
    vessels: data?.vessels ?? [],
    updatedAt: data?.updatedAt,
    total: data?.total ?? 0,
    isLoading,
    isError: !!error,
  };
}
