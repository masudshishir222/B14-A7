"use client";

import { useEffect, useState } from "react";

export default function CurrentDate() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    setCurrentDate(new Intl.DateTimeFormat("bn-BD", options).format(new Date()));
  }, []);

  return <p className="text-sm text-slate-500">{currentDate || "লোড হচ্ছে..."}</p>;
}
