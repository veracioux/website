import { useRuntimeConfig } from "#app";

export default function api(resourceName: "base" | "projects") {
  const runtimeConfig = useRuntimeConfig();

  /*
    const host = runtimeConfig.public.env === "dev" ?
        `http://localhost:${runtimeConfig.public.backendPort}` : "";
     */
  const base = "/api";

  const values = {
    base,
    projects: `${base}/projects/`,
  };

  return values[resourceName];
}
