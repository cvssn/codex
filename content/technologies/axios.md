---
title: axios
category: technology
date: 2026-05-08
tags: [technology, framework, package]
summary: promise based http client for the browser and node.js
---

## instalação

### utilizando npm

```bash
npm install axios
```

### utilizando pnpm

```bash
pnpm install axios
```

### utilizando yarn

```bash
yarn add axios
```

### utilizando bun

```bash
bun add axios
```

### utilizando deno

```bash
deno install npm:axios
```

### utilizando jsdelivr

ao usar o jsdelivr, recomendamos usar a versão minificada e fixar o número da versão para evitar alterações inesperadas. Se desejar usar a versão mais recente, basta remover o número da versão. isso é fortemente desencorajado para uso em produção, pois pode levar a alterações inesperadas em sua aplicação.

```html
<script src="https://cdn.jsdelivr.net/npm/axios@<x.x.x>/dist/axios.min.js"></script>
```

### utilizando unpkg

ao usar o unpkg, recomendamos usar a versão minificada e fixar o número da versão para evitar alterações inesperadas. Se desejar usar a versão mais recente, você pode fazê-lo omitindo o número da versão. Isso é fortemente desencorajado para uso em produção, pois pode levar a alterações inesperadas em sua aplicação.

```html
<script src="https://unpkg.com/axios@<x.x.x>/dist/axios.min.js"></script>
```

## importando o axios

uma vez instalado, você pode importar a biblioteca utilizando ou o `import` ou o `require`:

```js
import axios, { isCancel, AxiosError } from "axios";
```

você também pode usar a exportação padrão, já que a exportação nomeada é apenas uma reexportação da fábrica do Axios:

```js
import axios from "axios";

console.log(axios.isCancel("olá, mundo!"));
```

se você utilizar `require` para importar, **apenas a exportação padrão estará disponível**:

```js
const axios = require("axios");

console.log(axios.isCancel("olá, mundo!"));
```

para alguns bundlers e linters ES6, você pode precisar de:

```js
import { default as axios } from "axios";
```

Para ambientes personalizados ou legados onde a resolução de módulos apresenta comportamento inesperado, você pode importar o pacote pré-compilado diretamente:

```js
// bundle commonjs do navegador (es2017)
const axios = require("axios/dist/browser/axios.cjs");

// bundle commonjs do node (es2017)
// const axios = require("axios/dist/node/axios.cjs");
```

## fazendo o seu primeiro request

um request do axios pode ser feita com apenas duas linhas de código. Fazer sua primeira requisição com Axios é muito simples. Você pode fazer uma requisição para qualquer API fornecendo a URL e o método. Por exemplo, para fazer uma requisição GET para a API `jsonplaceholder`, você pode usar o seguinte código:

```js
import axios from "axios";

const response = await axios.get(
    "https://jsonplaceholder.typicode.com/posts/1"
);

console.log(response.data);
```

o axios fornece uma API simples para fazer requisições. Você pode usar o método `axios.get` para fazer uma requisição GET, o método `axios.post` para fazer uma requisição POST e assim por diante. Você também pode usar o método `axios.request` para fazer uma requisição com qualquer método.

> definindo um timeout em produção
>
> sem um `timeout`, uma requisição travada pode ficar pendente indefinidamente. defina um timeout através da configuração da requisição:
>
> ```js
> const response = await axios.get("https://exemplo.com/data", {
>     timeout: 5000 // 5 segundos
> });
> ```
>
> veja sobre [`timeout` na configuração da solicitação](https://axios.rest/pages/advanced/request-config.html#timeout) e o [tratamento de erros](https://axios.rest/pages/advanced/error-handling.html) para os códigos `econnaborted` / `etimedout` correspondentes.

## features

O axios é um cliente HTTP poderoso que fornece uma API simples e fácil de usar para fazer requisições HTTP. Ele é compatível com todos os navegadores modernos e amplamente utilizado na comunidade JavaScript. Aqui estão alguns dos recursos que fazem do axios uma ótima escolha para o seu próximo projeto.

### isomórfico

O Axios é um cliente HTTP universal que pode ser usado tanto no navegador quanto no Node.js. Isso significa que você pode usar o Axios para fazer requisições de API tanto no seu código de front-end quanto no seu código de back-end. Isso torna o Axios uma ótima opção para criar aplicativos web progressivos (PWAs), aplicativos de página única (SPAs) e aplicativos renderizados no servidor (SSRs).

O Axios também é uma ótima opção para equipes que trabalham tanto no código de front-end quanto no de back-end. Ao usar o Axios em ambos os sistemas, você pode ter uma API consistente para fazer requisições HTTP, o que pode ajudar a reduzir a complexidade do seu código.

### suporte para fetch

O axios oferece suporte de primeira classe à API Fetch, uma alternativa moderna à API XHR. O adaptador é opcional e pode ser configurado. A mesma API é mantida para os adaptadores XHR e Fetch, o que facilita a adoção da API Fetch em seu código sem a necessidade de alterações.

### suporte para navegador

O Axios é compatível com todos os navegadores modernos e com alguns navegadores mais antigos, incluindo Chrome, Firefox, Safari e Edge. O Axios é uma ótima opção para criar aplicações web que precisam ser compatíveis com uma ampla variedade de navegadores.

### suporte para node.js

O axios também oferece suporte a uma ampla gama de versões do Node.js, com compatibilidade testada até a versão 12.x, tornando-o uma boa opção em ambientes onde a atualização para a versão mais recente do Node.js pode não ser possível ou prática.

Além do Node.js, o axios possui testes de fumaça (smoke tests) para Bun e Deno que validam comportamentos importantes em tempo de execução e aumentam a confiança na compatibilidade entre diferentes ambientes de execução.

### features adicionais

- suporta a api promise
- intercepta solicitação e resposta
- transforma dados de solicitação e resposta
- controlador de aborto
- timeouts
- Serialização de parâmetros de consulta com suporte para entradas aninhadas.
- Serialização automática do corpo da requisição para:
  - json (`application/json`)
  - multipart / formdata (`multipart/form-data`)
  - formulário codificado em url (`application/x-www-form-urlencoded`)
- postagem de formulários html como json
- Manipulação automática de dados JSON na resposta
- Captura de progresso para navegadores e Node.js com informações adicionais (velocidade, tempo restante)
- definição de limites de largura de banda para node.js
- compatibilidade com FormData e Blob em conformidade com as especificações (incluindo node.js)
- Suporte do lado do cliente para proteção contra XSRF
