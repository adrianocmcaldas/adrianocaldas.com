import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders Adriano's personal profile and selected work", async () => {
  const response = await render();
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<html lang="en">/i);
  assert.match(html, /hrefLang="pt"/i);
  assert.match(html, /hrefLang="es"/i);
  assert.match(html, /hrefLang="nb"/i);
  assert.match(html, /hrefLang="x-default"/i);
  assert.match(html, /PT · Português/);
  assert.match(html, /EN · English/);
  assert.match(html, /ES · Español/);
  assert.match(html, /NO · Norsk bokmål/);
  assert.match(html, /Adriano César Moreno Caldas/);
  assert.match(html, /<h1[^>]*>[\s\S]*César Moreno[\s\S]*Caldas[\s\S]*<\/h1>/);
  assert.match(html, /Technology seen end to end/);
  assert.match(html, /Cinteca/);
  assert.match(html, /CINTE · Telecommunications/);
  assert.match(html, /The incorporation of CINTE/);
  assert.match(html, /LegalNeuron/);
  assert.match(html, /NordixBIOS/);
  assert.match(html, /NordixAIgency/);
  assert.match(html, /https:\/\/nordixaigency\.com/);
  assert.match(html, /NCS Engine/);
  assert.match(html, /Plorea · Norway/);
  assert.match(html, /https:\/\/plorea\.no/);
  assert.match(html, /Innocards Loyalty · Switzerland/);
  assert.match(html, /AI Robotics · Norway/);
  assert.match(html, /https:\/\/airobotics\.no/);
  assert.match(html, /Equity holdings/);
  assert.match(html, /id="patentes"/);
  assert.match(html, /P202631350/);
  assert.match(html, /PI 0801894-4/);
  assert.match(html, /Applicant: AD Caldas Innotec, S\.A\./);
  assert.match(html, /<img[^>]+alt="Adriano César Moreno Caldas"/);
});

test("keeps the profile focused on practice rather than restricted titles", async () => {
  const response = await render();
  const html = await response.text();

  assert.doesNotMatch(html, /\bengineer(?:ing|s)?\b|\bmasters?\b|\bmaster's\b/i);
  assert.match(html, /digital signal processing/i);
  assert.match(html, /CTO roles/i);
  assert.match(html, /Global activity/i);
});

test("contains privacy-safe contact and machine-readable identity", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /application\/ld\+json/);
  assert.match(html, /"@type":"Person"/);
  assert.match(html, /"name":"Adriano César Moreno Caldas"/);
  assert.match(html, /"propertyID":"NIF","value":"A66316399"/);
  assert.match(html, /<form[^>]+class="contact-form"/);
  assert.match(html, /name="name"/);
  assert.match(html, /name="email"/);
  assert.match(html, /name="message"/);
  assert.match(html, /name="website"/);
  assert.match(html, /name="privacy"/);
  assert.match(html, /https:\/\/cinteca\.es\/\?lang=en#privacidad/);
  assert.match(html, /No advertising or audience analytics\. Protected contact\./);
  assert.doesNotMatch(html, /mailto:|tel:|google-analytics|googletagmanager/i);
  assert.match(html, /adriano-caldas-social\.png/);
});

test("uses the shared Lambda and Turnstile contact contract", async () => {
  const source = await readFile(
    new URL("../app/contact-form.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    source,
    /https:\/\/u33x6xbn7dq2l5jn66hvv7ovc40bgiye\.lambda-url\.eu-central-1\.on\.aws\//,
  );
  assert.match(source, /NEXT_PUBLIC_TURNSTILE_SITE_KEY/);
  assert.match(source, /challenges\.cloudflare\.com\/turnstile\/v0\/api\.js/);
  assert.match(source, /action: "contact"/);
  assert.match(source, /privacyAccepted:/);
  assert.match(source, /turnstileToken,/);
  assert.match(source, /language: locale/);
  assert.match(source, /site: "adrianocaldas"/);
});
