# Atlas Professionals

Projeto frontend desenvolvido com Nuxt 4, Vue 3 e Pinia.
A aplicação foi estruturada para separar responsabilidades entre páginas, componentes, composables, services, stores, tipos compartilhados e API interna.

O objetivo da arquitetura é manter as implementações previsíveis: cada nova funcionalidade deve ter sua regra de negócio, estado, chamada de dados, interface e estilos posicionados no lugar adequado.

## Como rodar o projeto

### Requisitos

- Node.js 24.12.0 ou versão compatível com Nuxt 4
- npm

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

O Nuxt iniciará o servidor local em:

```bash
http://localhost:3000
```

### Testes

```bash
npm run test
```

Para rodar os testes em modo observação:

```bash
npm run test:watch
```

### Build de produção

```bash
npm run build
```

### Preview do build

```bash
npm run preview
```

### Geração estática

```bash
npm run generate
```

## Ferramentas usadas

- **Nuxt 4**: usado como base da aplicação, organizando rotas, renderização, configurações globais e API interna.
- **Nuxt Image**: usado para otimizar imagens, definir dimensões, gerar placeholders e melhorar o carregamento visual.
- **Vue 3**: usado para construir interfaces com componentes e Composition API.
- **Pinia**: usado para centralizar estados compartilhados entre páginas e componentes.
- **Tailwind CSS 4**: usado para estilos utilitários globais quando fizer sentido.
- **SCSS**: usado para estilos específicos de páginas e componentes.
- **Vitest**: usado para executar os testes automatizados.
- **Vue Test Utils**: usado para testar comportamento de componentes Vue.
- **Happy DOM**: usado como ambiente DOM dos testes.
- **TypeScript**: usado para tipar dados, contratos, props, emits, stores e retornos de funções.

## Arquitetura do projeto

```text
app/
  assets/
    css/
    scss/
  components/
    InputText/
    Pagination/
    Select/
  composables/
  pages/
  services/
  stores/
  utils/
server/
  api/
shared/
  types/
docs/
```

### `app/pages`

Contém as rotas da aplicação.

Use esta pasta para implementar telas completas, responsáveis por montar a experiência final do usuário. Uma página pode consumir stores, services, composables e componentes, mas deve evitar concentrar regras reutilizáveis que possam ser extraídas para outras camadas.

Exemplos de uso:

- criar uma nova rota pública;
- montar uma tela a partir de componentes reutilizáveis;
- conectar dados da store com filtros, buscas, parâmetros de rota ou query string;
- configurar estados específicos daquela tela.

Cada página pode importar seu arquivo SCSS ao lado quando os estilos forem específicos daquela rota.

### `app/components`

Contém componentes reutilizáveis de interface.

```text
app/components/InputText/
  InputText.vue
  InputText.scss
  InputText.spec.ts
```

Use esta pasta para elementos que podem ser reaproveitados em mais de uma tela ou que representam uma parte isolada da interface.

Cada componente concentra:

- arquivo `.vue` com template, props, emits e comportamento;
- arquivo `.scss` com estilos do componente;
- arquivo `.spec.ts` com testes unitários.

Ao implementar um componente, prefira receber dados por props e comunicar eventos por emits. Componentes genéricos devem evitar depender diretamente de stores, rotas ou services.

### `app/stores`

Contém estados compartilhados da aplicação.

Use stores quando uma informação precisa ser acessada por diferentes páginas ou componentes, quando precisa ser mantida em memória, ou quando existe uma regra de consulta, filtro, seleção ou transformação que pertence ao domínio da aplicação.

Uma store deve:

- concentrar o estado principal de uma área;
- expor actions para carregar ou alterar dados;
- expor métodos ou getters para consultas derivadas;
- delegar chamadas externas para a camada de services.

Evite colocar detalhes visuais ou regras de layout dentro de stores.

### `app/services`

Contém funções responsáveis por buscar ou enviar dados.

Use services para isolar chamadas HTTP, endpoints e detalhes de comunicação. Assim, páginas e stores não precisam conhecer a URL final ou a estratégia de requisição.

Uma implementação nova deve criar ou reaproveitar um service quando precisar consumir dados de uma API, mesmo que essa API seja interna ao Nuxt.

### `server/api`

Contém endpoints internos servidos pelo Nuxt.

Use esta pasta para criar rotas de API locais, mockar respostas, adaptar dados antes de enviar para o frontend ou centralizar regras que devem rodar no lado do servidor.

Ao criar um novo endpoint, mantenha o contrato de resposta tipado em `shared/types` quando ele também for consumido pelo frontend.

### `app/composables`

Contém regras reutilizáveis baseadas na Composition API.

Use composables para encapsular comportamento que pode ser usado por mais de um componente ou página, como paginação, SEO, filtros, leitura de query string, controle de formulários ou estados derivados.

Um composable deve expor uma API pequena e clara, retornando refs, computeds e funções que a tela ou o componente possam consumir.

### `shared/types`

Contém tipos compartilhados entre frontend e servidor.

Use esta pasta para contratos de entidades, respostas de API e estruturas que precisam ser conhecidas por mais de uma camada.

Ao adicionar um novo formato de dado consumido pela aplicação, crie ou atualize o tipo correspondente para manter services, stores e componentes alinhados.

### `app/utils`

Contém funções auxiliares pequenas e puras.

Use utils para formatações, normalizações e transformações que não dependem de estado do Vue, rota, store ou ciclo de vida da aplicação.

Se a função precisar de `ref`, `computed`, `useRoute`, `useFetch` ou outro recurso da Composition API, ela provavelmente deve ser um composable, não um util.

## Estruturação dos componentes

Os componentes seguem uma estrutura simples e previsível:

- `script setup` com TypeScript;
- props e emits tipados;
- suporte a `v-model` quando o componente representa um campo de formulário;
- estilos em SCSS no mesmo diretório do componente;
- classes seguindo uma convenção próxima de BEM;
- testes unitários ao lado do componente.

Exemplo:

```text
Select/
  Select.vue       # componente
  Select.scss      # estilos
  Select.spec.ts   # testes
```

Essa organização deixa cada componente fácil de mover, testar e evoluir sem espalhar arquivos relacionados pelo projeto.

Ao criar um novo componente:

1. Crie uma pasta com o nome do componente.
2. Adicione o arquivo `.vue` com a implementação.
3. Adicione um `.scss` ao lado quando houver estilo específico.
4. Adicione um `.spec.ts` quando o componente tiver comportamento, interação, renderização condicional ou eventos relevantes.
5. Mantenha o componente o mais independente possível de regras externas.

## Fluxo de dados

O fluxo recomendado para novas implementações é:

1. A página monta a experiência e identifica quais dados ou estados precisa consumir.
2. A store concentra o estado compartilhado e as regras de consulta ou transformação.
3. O service executa a comunicação com a API.
4. A API interna em `server/api` retorna ou adapta os dados quando necessário.
5. Os tipos em `shared/types` garantem o contrato entre as camadas.
6. Os componentes recebem dados por props e emitem eventos para a camada acima.
7. Os composables encapsulam comportamentos reutilizáveis que não pertencem exclusivamente a uma tela.

Essa separação facilita a manutenção porque cada camada tem uma responsabilidade clara e pode evoluir sem espalhar regras por toda a aplicação.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm run preview` | Executa localmente o build gerado |
| `npm run generate` | Gera a versão estática da aplicação |
| `npm run test` | Executa a suíte de testes uma vez |
| `npm run test:watch` | Executa os testes em modo watch |
