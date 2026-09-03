import type { Professional } from "~~/shared/types/professional";

export const getProfessionals = () =>
  useFetch<Professional[]>("/api/professionals", {
    default: () => [],
  });
