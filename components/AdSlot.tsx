'use client';

import { useEffect, useRef } from 'react';

export default function AdSlot({
  slotId,
  style = { display: 'block', width: '100%', height: '250px' },
  format = 'auto',
  className = 'ad-slot-infeed',
}: {
  slotId: string;
  style?: React.CSSProperties;
  format?: string;
  className?: string;
}) {
  // 1. Add the reference to track initialization
  const adInitialized = useRef(false);

  useEffect(() => {
    // 2. Prevent the double-fire in Next.js Strict Mode
    if (adInitialized.current) return;
    adInitialized.current = true;

    try {
      ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle = 
       (window as unknown as { adsbygoogle: unknown[] }).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`${className} bg-base/50 rounded-lg border border-primary/10 flex items-center justify-center`}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot={slotId}
        data-ad-format={format}
      />
    </div>
  );
}