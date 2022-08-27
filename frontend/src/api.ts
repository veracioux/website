const base =
    import.meta.env.VITE_ENVIRONMENT == "staging" &&
    import.meta.env.VITE_MACHINE == "public"
        ? "/stg/api"
        : "/api";

export default {
    base,
    projects: `${base}/projects/`,
};
