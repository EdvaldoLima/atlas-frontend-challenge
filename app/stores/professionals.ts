import type { Professional } from "~~/shared/types/professional";
import { getProfessionals } from "~/services/professionals";

export type ProfessionalPriceRange =
  | "all"
  | "up-to-100"
  | "100-to-250"
  | "250-to-400"
  | "above-400";

export type ProfessionalSort = "default" | "name-asc" | "price-asc" | "price-desc";

interface FilterProfessionalsParams {
  priceRange?: ProfessionalPriceRange;
  searchTerm?: string;
  sort?: ProfessionalSort;
}

export const useProfessionalsStore = defineStore("professionals", {
  state: () => ({
    professionalsList: [] as Professional[],
  }),

  actions: {
    async fetchProfessionals() {
      if (this.professionalsList.length) {
        return;
      }

      const { data } = await getProfessionals();

      this.professionalsList = data.value;
    },

    getProfessionalById(id: number) {
      return this.professionalsList.find((professional) => professional.id === id);
    },

    filterProfessionals({
      priceRange = "all",
      searchTerm = "",
      sort = "default",
    }: FilterProfessionalsParams = {}) {
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const hasSearchFilter = normalizedSearch.length > 0;
      const hasPriceFilter = priceRange !== "all";
      const hasSort = sort !== "default";

      if (!hasSearchFilter && !hasPriceFilter && !hasSort) {
        return this.professionalsList;
      }

      return this.professionalsList
        .filter((professional) => {
          if (!hasSearchFilter) {
            return true;
          }

          const fullName =
            `${professional.firstName} ${professional.lastName}`.toLowerCase();
          const profession = professional.profession.toLowerCase();

          return (
            fullName.includes(normalizedSearch) ||
            profession.includes(normalizedSearch)
          );
        })
        .filter((professional) => {
          const serviceCost = professional.serviceCost;

          switch (priceRange) {
            case "up-to-100":
              return serviceCost <= 100;
            case "100-to-250":
              return serviceCost > 100 && serviceCost <= 250;
            case "250-to-400":
              return serviceCost > 250 && serviceCost <= 400;
            case "above-400":
              return serviceCost > 400;
            default:
              return true;
          }
        })
        .toSorted((firstProfessional, secondProfessional) => {
          switch (sort) {
            case "name-asc":
              return `${firstProfessional.firstName} ${firstProfessional.lastName}`
                .localeCompare(
                  `${secondProfessional.firstName} ${secondProfessional.lastName}`,
                  "pt-BR",
                );
            case "price-asc":
              return firstProfessional.serviceCost - secondProfessional.serviceCost;
            case "price-desc":
              return secondProfessional.serviceCost - firstProfessional.serviceCost;
            default:
              return 0;
          }
        });
    },
  },
});
