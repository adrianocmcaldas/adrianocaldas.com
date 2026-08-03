# adrianocaldas.com

Site pessoal de Adriano César Moreno Caldas. A página apresenta sua visão de
tecnologia, áreas de atuação, projetos próprios, colaborações e trajetória sem
publicar dados pessoais de contato.

O conteúdo está disponível em português, inglês, espanhol e norueguês Bokmål.
O idioma é associado ao navegador; idiomas não suportados usam inglês. A escolha
manual fica registrada no parâmetro `?lang=`.

## Desenvolvimento local

Requer Node.js 22.13 ou superior.

```bash
npm install
npm run dev
```

A prévia abre normalmente em `http://localhost:3000`. Se essa porta estiver em
uso, execute `npm run dev -- --port 3001`.

## Validação

```bash
npm test
npm run lint
npm audit --omit=dev
```

O site é estático: não usa banco de dados, cookies ou analytics. O formulário
utiliza a mesma Lambda SMTP e o mesmo widget Cloudflare Turnstile da Cinteca.
Este site envia o identificador fixo `adrianocaldas`; a Lambda mantém o
destinatário único em `CONTACT_TO_EMAIL` e seleciona
`CONTACT_FROM_EMAIL_AC`, configurado como `web-ac@cinteca.es`.

Copie `.env.example` para `.env.local` e informe a chave pública do widget em
`NEXT_PUBLIC_TURNSTILE_SITE_KEY`. Na Lambda, inclua as origens exatas
`https://adrianocaldas.com` e `https://www.adrianocaldas.com` em
`ALLOWED_ORIGINS`. Em `TURNSTILE_EXPECTED_HOSTNAMES` e no widget Turnstile,
inclua `adrianocaldas.com` e `www.adrianocaldas.com`.

## Publicação

O projeto pode ser gerado com `npm run build` e publicado como site estático na
infraestrutura escolhida para o domínio `adrianocaldas.com`.
