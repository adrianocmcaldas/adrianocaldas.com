import assert from "node:assert/strict";
import test from "node:test";

import { localeOptions, resolveLocale, translations } from "../app/i18n.ts";

const locales = ["pt", "en", "es", "nb"];

test("matches the four supported browser language families", () => {
  assert.equal(resolveLocale(["pt-BR"]), "pt");
  assert.equal(resolveLocale(["en-US"]), "en");
  assert.equal(resolveLocale(["es-ES"]), "es");
  assert.equal(resolveLocale(["nb-NO"]), "nb");
  assert.equal(resolveLocale(["no-NO"]), "nb");
});

test("shows an abbreviation and native name for every language", () => {
  assert.deepEqual(
    localeOptions.map(({ code, short, label }) => ({ code, short, label })),
    [
      { code: "pt", short: "PT", label: "Português" },
      { code: "en", short: "EN", label: "English" },
      { code: "es", short: "ES", label: "Español" },
      { code: "nb", short: "NO", label: "Norsk bokmål" },
    ],
  );
});

test("uses the first supported browser language and falls back to English", () => {
  assert.equal(resolveLocale(["fr-FR", "es-MX", "en"]), "es");
  assert.equal(resolveLocale(["de-DE", "fr-FR"]), "en");
  assert.equal(resolveLocale(["nn-NO"]), "en");
  assert.equal(resolveLocale([]), "en");
});

test("every locale contains the complete page and contact form", () => {
  for (const locale of locales) {
    const copy = translations[locale];
    assert.equal(copy.capabilities.items.length, 8, `${locale} capability count`);
    assert.equal(copy.projects.owned.length, 7, `${locale} owned projects`);
    assert.equal(copy.projects.collaborations.length, 3, `${locale} collaborations`);
    assert.equal(copy.trajectory.items.length, 4, `${locale} trajectory items`);
    assert.ok(
      copy.trajectory.items.some((item) => item.time === "2004" && item.title.includes("CINTE")),
      `${locale} CINTE milestone`,
    );
    assert.equal(copy.signal.items.length, 4, `${locale} activity signals`);
    assert.ok(copy.contact.form.success.length > 0, `${locale} success message`);
    assert.ok(copy.contact.form.turnstileError.length > 0, `${locale} Turnstile message`);
  }
});

test("every locale lists the same patent register and equity holding", () => {
  const expectedNumbers = [
    ["P202631350", "P202631351", "P202631352", "P202631353"],
    ["PI 0600924-7", "PI 0706462-4", "PI 0801894-4"],
  ];

  for (const locale of locales) {
    const copy = translations[locale];
    assert.deepEqual(
      copy.patents.groups.map((group) => group.patents.map((patent) => patent.number)),
      expectedNumbers,
      `${locale} patent numbers`,
    );
    for (const group of copy.patents.groups) {
      for (const patent of group.patents) {
        assert.ok(patent.title.length > 0, `${locale} ${patent.number} title`);
        assert.ok(patent.status.length > 0, `${locale} ${patent.number} status`);
      }
    }
    assert.match(copy.patents.groups[0].holder, /AD Caldas Innotec, S\.A\./, `${locale} applicant`);
    assert.match(copy.patents.groups[1].holder, /Adriano César Moreno Caldas/, `${locale} holder`);
    assert.deepEqual(
      copy.projects.holdings.map((project) => project.url),
      ["https://airobotics.no"],
      `${locale} equity holdings`,
    );
  }
});

test("excluded titles are absent from every language", () => {
  const content = JSON.stringify(translations);
  assert.doesNotMatch(content, /engenheir|engenharia|mestrado|\bmestre\b/i);
  assert.doesNotMatch(content, /\bengineer(?:ing|s)?\b|\bmasters?\b|\bmaster's\b/i);
  assert.doesNotMatch(content, /ingenier|ingeniería|máster|maestría/i);
  assert.doesNotMatch(content, /ingeniør|mastergrad/i);
});

test("all languages keep global scope and protected contact", () => {
  for (const locale of locales) {
    const copy = translations[locale];
    assert.match(copy.contact.protectedLabel, /Turnstile/i, `${locale} Turnstile`);
    assert.ok(copy.jsonDescription.length > 0, `${locale} structured description`);
  }

  assert.match(translations.en.signal.items.join(" "), /Global activity/);
  assert.match(translations.pt.signal.items.join(" "), /Atuação global/);
  assert.match(translations.es.signal.items.join(" "), /Actividad global/);
  assert.match(translations.nb.signal.items.join(" "), /Global aktivitet/);
});
