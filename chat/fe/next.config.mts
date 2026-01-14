import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants.js";

export default (phase: any) =>
  ({
    async rewrites() {
      if (phase === PHASE_DEVELOPMENT_SERVER) {
        return [
          {
            source: "/api/:path*",
            destination: "http://localhost:9000/:path*",
          },
        ];
      }
      return [];
    },
  }) satisfies NextConfig;
