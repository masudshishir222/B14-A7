"use client";

import { useEffect, useState } from "react";

type CurrentDateProps = {
  className?: string;
};

const formatCurrentDate = () =>
  new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

export default function CurrentDate({
  className = "text-sm text-slate-500",
}: CurrentDateProps) {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const initialUpdate = window.setTimeout(
      () => setCurrentDate(formatCurrentDate()),
      0,
    );
    const interval = window.setInterval(
      () => setCurrentDate(formatCurrentDate()),
      60_000,
    );

    return () => {
      window.clearTimeout(initialUpdate);
      window.clearInterval(interval);
    };
  }, []);

  return <time className={className}>{currentDate || "লোড হচ্ছে..."}</time>;
}
