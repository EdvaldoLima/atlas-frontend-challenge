<script lang="ts" setup>
import type {
  ProfessionalPriceRange,
  ProfessionalSort,
} from "~/stores/professionals";
import { useProfessionalsStore } from "~/stores/professionals";
import { formatCurrency } from "~/utils/formatCurrency";

const professionalsStore = useProfessionalsStore();

await professionalsStore.fetchProfessionals();

useHomeSeo();

const searchTerm = ref("");
const selectedPriceRange = ref<ProfessionalPriceRange>("all");
const selectedSort = ref<ProfessionalSort>("default");

const priceRanges = [
  { label: "Todos os valores", value: "all" },
  { label: "Até R$ 100", value: "up-to-100" },
  { label: "R$ 100 a R$ 250", value: "100-to-250" },
  { label: "R$ 250 a R$ 400", value: "250-to-400" },
  { label: "Acima de R$ 400", value: "above-400" },
];

const sortOptions = [
  { label: "Ordem padrão", value: "default" },
  { label: "Nome A-Z", value: "name-asc" },
  { label: "Menor preço", value: "price-asc" },
  { label: "Maior preço", value: "price-desc" },
];

const filteredProfessionals = computed(() =>
  professionalsStore.filterProfessionals({
    priceRange: selectedPriceRange.value,
    searchTerm: searchTerm.value,
    sort: selectedSort.value,
  }),
);

const {
  currentPage,
  displayedEnd,
  displayedStart,
  handlePageChange,
  paginatedItems: paginatedProfessionals,
  resetPage,
  totalItems,
  totalPages,
} = usePagination(filteredProfessionals, {
  pageSize: 50,
});

watch([searchTerm, selectedPriceRange, selectedSort], () => {
  void resetPage();
});
</script>
<template>
  <main class="professionals-listing">
    <section class="professionals-listing__shell">
      <div class="professionals-listing__header">
        <div>
          <p class="professionals-listing__eyebrow">
            Catálogo de profissionais
          </p>
          <h1 class="professionals-listing__title">
            Encontre especialistas para o seu projeto
          </h1>
        </div>

        <div class="professionals-listing__search">
          <label
            for="professional-search"
            class="professionals-listing__sr-only"
          >
            Buscar por nome ou profissão
          </label>
          <InputText
            id="professional-search"
            v-model="searchTerm"
            placeholder="Buscar por nome ou profissão..."
          />
        </div>
      </div>

      <div class="professionals-listing__filters">
        <Select
          id="price-range"
          v-model="selectedPriceRange"
          label="Filtrar por valor"
          :options="priceRanges"
        />

        <Select
          id="sort-professionals"
          v-model="selectedSort"
          label="Ordenar por"
          :options="sortOptions"
        />

        <button
          type="button"
          class="professionals-listing__clear-button"
          :disabled="
            !searchTerm &&
            selectedPriceRange === 'all' &&
            selectedSort === 'default'
          "
          @click="
            searchTerm = '';
            selectedPriceRange = 'all';
            selectedSort = 'default';
          "
        >
          Limpar
        </button>
      </div>

      <p class="professionals-listing__result-count" aria-live="polite">
        Exibindo {{ displayedStart }}-{{ displayedEnd }} de
        {{ totalItems }} profissionais
      </p>

      <div
        v-if="paginatedProfessionals.length"
        class="professionals-listing__grid"
      >
        <article
          v-for="(professional, index) in paginatedProfessionals"
          :key="professional.id"
          class="professional-card"
        >
          <div class="professional-card__header">
            <NuxtImg
              :src="professional.image"
              :alt="`Foto de ${professional.firstName}`"
              width="64"
              height="64"
              :loading="index < 8 ? 'eager' : 'lazy'"
              decoding="async"
              :fetchpriority="index < 4 ? 'high' : 'low'"
              :placeholder="[16, 16, 60, 8]"
              class="professional-card__avatar"
            />

            <div class="professional-card__summary">
              <h2 class="professional-card__name">
                {{ professional.firstName }} {{ professional.lastName }}
              </h2>
              <p class="professional-card__profession">
                {{ professional.profession }}
              </p>
            </div>
          </div>

          <div class="professional-card__body">
            <a
              :href="`mailto:${professional.email}`"
              class="professional-card__email"
            >
              {{ professional.email }}
            </a>

            <div class="professional-card__price">
              <span class="professional-card__price-label"
                >Valor do serviço</span
              >
              <strong class="professional-card__price-value">
                {{ formatCurrency(professional.serviceCost) }}
              </strong>
            </div>

            <NuxtLink
              :to="`/professionals/${professional.id}`"
              class="professional-card__profile-link"
            >
              Ver perfil
            </NuxtLink>
          </div>
        </article>
      </div>

      <div v-else class="professionals-listing__empty">
        <h2 class="professionals-listing__empty-title">
          Nenhum profissional encontrado
        </h2>
        <p class="professionals-listing__empty-description">
          Tente ajustar a busca ou escolher outra faixa de valor.
        </p>
      </div>

      <Pagination
        v-if="totalItems > 0"
        :current-page="currentPage"
        :total-pages="totalPages"
        @update:current-page="handlePageChange"
      />
    </section>
  </main>
</template>

<style src="./index.scss"></style>
