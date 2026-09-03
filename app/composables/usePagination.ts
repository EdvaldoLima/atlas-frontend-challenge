import type { Ref } from "vue";

interface UsePaginationOptions {
  pageSize: number;
  queryKey?: string;
}

export const usePagination = <T>(
  items: Ref<T[]>,
  { pageSize, queryKey = "page" }: UsePaginationOptions,
) => {
  const route = useRoute();

  const totalItems = computed(() => items.value.length);

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalItems.value / pageSize)),
  );

  const currentPage = computed(() => {
    const page = Number(route.query[queryKey] ?? 1);

    if (!Number.isInteger(page) || page < 1) {
      return 1;
    }

    return Math.min(page, totalPages.value);
  });

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    const end = start + pageSize;

    return items.value.slice(start, end);
  });

  const displayedStart = computed(() =>
    totalItems.value === 0 ? 0 : (currentPage.value - 1) * pageSize + 1,
  );

  const displayedEnd = computed(() =>
    Math.min(currentPage.value * pageSize, totalItems.value),
  );

  const handlePageChange = async (page: number) => {
    await navigateTo({
      query: {
        ...route.query,
        [queryKey]: page === 1 ? undefined : page,
      },
    });
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    currentPage,
    displayedEnd,
    displayedStart,
    handlePageChange,
    paginatedItems,
    totalItems,
    totalPages,
  };
};
