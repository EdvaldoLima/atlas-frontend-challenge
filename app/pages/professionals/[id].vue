<script lang="ts" setup>
import { useProfessionalsStore } from "~/stores/professionals";
import { formatCurrency } from "~/utils/formatCurrency";
import type { Professional } from "~~/shared/types/professional";

const route = useRoute();
const professionalsStore = useProfessionalsStore();

await professionalsStore.fetchProfessionals();

const professionalId = computed(() => Number(route.params.id));
const professional = computed(() =>
  professionalsStore.getProfessionalById(professionalId.value),
);

if (!professional.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Profissional nao encontrado",
  });
}

const selectedProfessional = computed(() => professional.value as Professional);
const { fullName } = useProfessionalSeo(selectedProfessional, professionalId);
</script>

<template>
  <main
    v-if="professional"
    class="professional-detail"
  >
    <section class="professional-detail__shell">
      <NuxtLink
        to="/"
        class="professional-detail__back-link"
      >
        Voltar ao catalogo
      </NuxtLink>

      <section class="professional-profile">
        <div class="professional-profile__grid">
          <div class="professional-profile__media">
            <NuxtImg
              :src="professional.image"
              :alt="`Foto de ${professional.firstName}`"
              width="300"
              height="300"
              loading="eager"
              decoding="async"
              fetchpriority="high"
              :placeholder="[32, 32, 60, 8]"
              class="professional-profile__avatar"
            />
          </div>

          <div class="professional-profile__content">
            <div>
              <p class="professional-profile__profession">
                {{ professional.profession }}
              </p>
              <h1 class="professional-profile__name">
                {{ fullName }}
              </h1>
            </div>

            <p class="professional-profile__description">
              {{ professional.description }}
            </p>

            <div class="professional-profile__meta-grid">
              <div v-if="professional.location">
                <h2 class="professional-detail__meta-label">
                  Localizacao
                </h2>
                <p class="professional-detail__meta-value">
                  {{ professional.location }}
                  <span
                    v-if="professional.distanceKm"
                    class="professional-detail__meta-muted"
                  >
                    - {{ professional.distanceKm.toFixed(1) }} km
                  </span>
                </p>
              </div>

              <div v-if="professional.availability">
                <h2 class="professional-detail__meta-label">
                  Disponibilidade
                </h2>
                <p class="professional-detail__meta-value">
                  {{ professional.availability }}
                </p>
              </div>
            </div>
          </div>

          <aside class="professional-profile__aside">
            <div class="professional-profile__stats">
              <div>
                <span class="professional-detail__meta-label">
                  Valor do servico
                </span>
                <strong class="professional-detail__highlight-value">
                  {{ formatCurrency(professional.serviceCost) }}
                </strong>
              </div>

              <div v-if="professional.rating">
                <span class="professional-detail__meta-label">
                  Avaliacao media
                </span>
                <strong class="professional-detail__highlight-value">
                  {{ professional.rating.toFixed(1) }}/5
                </strong>
              </div>
            </div>

            <a
              :href="`mailto:${professional.email}`"
              class="professional-profile__contact-link"
            >
              Entrar em contato
            </a>
          </aside>
        </div>
      </section>

      <section
        v-if="professional.services?.length"
        class="professional-detail__section"
      >
        <h2 class="professional-detail__section-title">
          Servicos prestados
        </h2>
        <ul class="professional-detail__service-list">
          <li
            v-for="service in professional.services"
            :key="service"
            class="professional-detail__service-item"
          >
            {{ service }}
          </li>
        </ul>
      </section>

      <section
        v-if="professional.gallery?.length"
        class="professional-detail__section"
      >
        <h2 class="professional-detail__section-title">Galeria</h2>
        <div class="professional-detail__gallery">
          <NuxtImg
            v-for="(image, index) in professional.gallery"
            :key="image"
            :src="image"
            :alt="`Imagem ${index + 1} do trabalho de ${professional.firstName}`"
            width="640"
            height="420"
            sizes="sm:100vw md:50vw lg:33vw"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
            :placeholder="[32, 21, 60, 8]"
            class="professional-detail__gallery-image"
          />
        </div>
      </section>

      <section
        v-if="professional.reviews?.length"
        class="professional-detail__section"
      >
        <h2 class="professional-detail__section-title">Avaliacoes</h2>
        <div class="professional-detail__reviews">
          <article
            v-for="review in professional.reviews"
            :key="review.id"
            class="professional-review"
          >
            <div class="professional-review__header">
              <h3 class="professional-review__author">
                {{ review.author }}
              </h3>
              <span class="professional-review__rating">
                {{ review.rating.toFixed(1) }}/5
              </span>
            </div>
            <p class="professional-review__comment">
              {{ review.comment }}
            </p>
          </article>
        </div>
      </section>
    </section>
  </main>
</template>

<style src="./[id].scss"></style>
