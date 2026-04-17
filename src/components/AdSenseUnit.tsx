"use client";

import { useEffect, useRef } from "react";

export default function AdSenseUnit() {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (adRef.current && adRef.current.offsetWidth > 0) {
        ((window as unknown as Record<string, unknown>).adsbygoogle as unknown[] | undefined) ||
          Object.defineProperty(window, "adsbygoogle", { value: [], writable: true });
        (
          (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle
        ).push({});
      }
    } catch {}
  }, []);

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-6449761611054213"
      data-ad-slot="9020588122"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
