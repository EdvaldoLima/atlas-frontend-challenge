import { faker } from '@faker-js/faker';
import type { Professional } from '~~/shared/types/professional';

type NonEmptyStringArray = readonly [string, ...string[]];

const professionals: Professional[] = [];

const serviceOptions = [
  "Consultoria inicial",
  "Planejamento do projeto",
  "Execucao do servico",
  "Acompanhamento remoto",
  "Atendimento emergencial",
  "Revisao e ajustes",
  "Treinamento personalizado",
  "Suporte pos-servico",
] satisfies NonEmptyStringArray;

const availabilityOptions = [
  "Segunda a sexta, 8h as 18h",
  "Segunda a sabado, 9h as 19h",
  "Atende em horarios flexiveis",
  "Disponivel para agendas aos finais de semana",
] satisfies NonEmptyStringArray;

const reviewComments = [
  "Atendimento pontual, cuidadoso e com excelente comunicacao durante todo o processo.",
  "O servico foi entregue dentro do prazo e com muita atencao aos detalhes.",
  "Experiencia muito positiva, com orientacoes claras e resultado acima do esperado.",
  "Profissional organizado, objetivo e bastante prestativo do inicio ao fim.",
] satisfies NonEmptyStringArray;

const getDeterministicItem = (seed: number, items: NonEmptyStringArray) =>
  items[seed % items.length] ?? items[0];

const getDeterministicItems = (
  seed: number,
  items: NonEmptyStringArray,
  count: number,
) => Array.from({ length: count }, (_, index) => getDeterministicItem(seed + index, items));

for (let i = 1; i <= 500; i++) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const profession = faker.person.jobTitle();
  const services = getDeterministicItems(i, serviceOptions, 4);
  const rating = faker.number.float({ min: 4, max: 5, fractionDigits: 1 });

  professionals.push({
    id: i,
    image: faker.image.avatar(),
    firstName,
    lastName,
    profession,
    description: `${firstName} ${lastName} atua como ${profession.toLowerCase()} com foco em atendimento personalizado, clareza na comunicacao e entregas alinhadas ao contexto de cada cliente.`,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    serviceCost: faker.number.float({ min: 50, max: 500, fractionDigits: 2 }),
    rating,
    location: faker.location.city(),
    distanceKm: faker.number.float({ min: 1, max: 30, fractionDigits: 1 }),
    services,
    gallery: [1, 2, 3].map(
      (galleryIndex) =>
        `https://picsum.photos/seed/professional-${i}-${galleryIndex}/640/420`,
    ),
    reviews: [1, 2, 3].map((reviewIndex) => ({
      id: reviewIndex,
      author: faker.person.fullName(),
      rating: Math.max(4, Number((rating - (reviewIndex - 1) * 0.2).toFixed(1))),
      comment: getDeterministicItem(i + reviewIndex, reviewComments),
    })),
    availability: getDeterministicItem(i, availabilityOptions),
  });
}

export default professionals;
