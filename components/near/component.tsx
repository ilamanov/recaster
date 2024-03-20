"use client";

import { useEffect } from "react";

const { useInitNear, Widget } = require("near-social-vm");

export default function Component({ src, props }: { src: string; props: any }) {
  const { initNear } = useInitNear();

  useEffect(() => {
    initNear && initNear({ networkId: "testnet", selector: null });
  }, [initNear]);

  return <Widget src={src} props={props} />;
}
