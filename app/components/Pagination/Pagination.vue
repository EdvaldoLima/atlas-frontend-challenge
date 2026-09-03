<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    currentPage: number;
    totalPages: number;
  }>(),
  {
    currentPage: 1,
    totalPages: 1,
  },
);

const emit = defineEmits<{
  (event: "update:currentPage", page: number): void;
}>();

const visiblePages = computed(() => {
  const pages = new Set<number>();
  const firstPage = 1;
  const lastPage = Math.max(firstPage, props.totalPages);

  pages.add(firstPage);
  pages.add(lastPage);

  for (let page = props.currentPage - 1; page <= props.currentPage + 1; page++) {
    if (page >= firstPage && page <= lastPage) {
      pages.add(page);
    }
  }

  return [...pages].sort((first, second) => first - second);
});

const goToPage = (page: number) => {
  if (page < 1 || page > props.totalPages || page === props.currentPage) {
    return;
  }

  emit("update:currentPage", page);
};

const hasPreviousPageGap = (page: number, index: number) => {
  const previousPage = visiblePages.value[index - 1];

  return previousPage !== undefined && page - previousPage > 1;
};
</script>

<template>
  <nav
    class="pagination"
    aria-label="Paginação"
  >
    <button
      type="button"
      :disabled="currentPage === 1"
      class="pagination__button pagination__button--nav"
      @click="goToPage(currentPage - 1)"
    >
      Anterior
    </button>

    <template
      v-for="(page, index) in visiblePages"
      :key="page"
    >
      <span
        v-if="hasPreviousPageGap(page, index)"
        class="pagination__ellipsis"
      >
        ...
      </span>

      <button
        type="button"
        :aria-current="page === currentPage ? 'page' : undefined"
        class="pagination__button pagination__button--page"
        :class="{ 'pagination__button--active': page === currentPage }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>
    </template>

    <button
      type="button"
      :disabled="currentPage === totalPages"
      class="pagination__button pagination__button--nav"
      @click="goToPage(currentPage + 1)"
    >
      Próxima
    </button>
  </nav>
</template>

<style src="./Pagination.scss"></style>
