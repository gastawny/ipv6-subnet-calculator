"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState({} as any);

  useEffect(() => {
    (async () =>
      setData(
        await (await fetch("http://localhost:3000/api/redes?id=4&asd=3")).json()
      ))();
  }, []);

  return <div>{data?.message}</div>;
}
