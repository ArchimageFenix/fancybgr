"use client";

import { useEffect } from "react";

import {
  initializeAIAssetCache,
} from "@/lib/cache/aiAssetCache";

export default function AIAssetCacheBootstrap() {
  useEffect(() => {
    void initializeAIAssetCache();
  }, []);

  return null;
}