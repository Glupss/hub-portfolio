"use client";

import { useEffect, useState } from "react";

export default function Typewriter({
  texts = [],
  speed = 80,
  pause = 1500,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [forward, setForward] = useState(true);

  useEffect(() => {
    if (!texts.length) return;

    const current = texts[index % texts.length] || "";
    const isEnd = forward && subIndex === current.length;
    const isStart = !forward && subIndex === 0;

    const delay =
      isEnd || isStart
        ? pause
        : forward
        ? speed
        : Math.max(30, Math.floor(speed / 2));

    const t = setTimeout(() => {
      if (isEnd) {
        setForward(false);
      } else if (isStart) {
        setForward(true);
        setIndex((i) => (i + 1) % texts.length);
      } else {
        setSubIndex((s) => s + (forward ? 1 : -1));
      }
    }, delay);

    return () => clearTimeout(t);
  }, [texts, index, subIndex, forward, speed, pause]);

  const shown = texts.length
    ? texts[index % texts.length].slice(0, subIndex)
    : "";

  return (
    <span className={className}>
      {shown}
      <span className="inline-block w-[10px] ml-1 animate-pulse">▌</span>
    </span>
  );
}
