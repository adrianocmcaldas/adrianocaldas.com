"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import ContactForm from "./contact-form";
import {
  localeOptions,
  resolveLocale,
  translations,
  type Locale,
  type Project,
} from "./i18n";

function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <div className="project-list">
      {projects.map((project) => (
        <a
          className="project-row"
          href={project.url}
          target="_blank"
          rel="noreferrer"
          key={project.name}
        >
          <span>{project.name}</span>
          <small>{project.descriptor}</small>
          <i aria-hidden="true">↗</i>
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const copy = translations[locale];

  useEffect(() => {
    const requestedLocale = new URLSearchParams(window.location.search).get("lang");
    const browserLanguages =
      navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language];
    const detectedLocale = requestedLocale
      ? resolveLocale([requestedLocale])
      : resolveLocale(browserLanguages);

    const updateFrame = window.requestAnimationFrame(() => {
      setLocale(detectedLocale);
    });
    return () => window.cancelAnimationFrame(updateFrame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = copy.htmlLang;
    document.title = copy.metadata.title;

    const description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    );
    description?.setAttribute("content", copy.metadata.description);
  }, [copy]);

  const personJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://adrianocaldas.com/#person",
      name: "Adriano César Moreno Caldas",
      alternateName: "Adriano Caldas",
      url: "https://adrianocaldas.com",
      image: "https://adrianocaldas.com/adriano-caldas.jpeg",
      nationality: "Brazilian",
      affiliation: {
        "@type": "Organization",
        name: "AD Caldas Innotec, S.A.",
        alternateName: "Cinteca",
        url: "https://cinteca.es",
        identifier: {
          "@type": "PropertyValue",
          propertyID: "NIF",
          value: "A66316399",
        },
      },
      knowsAbout: copy.capabilities.items.flatMap((capability) => [
        capability.title,
        capability.description,
        capability.topics,
      ]),
      description: copy.jsonDescription,
      inLanguage: copy.htmlLang,
    }),
    [copy],
  );

  function changeLocale(nextLocale: Locale) {
    setLocale(nextLocale);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLocale);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }

  return (
    <main id="inicio">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <header className="site-header">
        <a
          className="monogram"
          href="#inicio"
          aria-label={`Adriano César Moreno Caldas — ${copy.footer.back}`}
        >
          AC<span>/</span>
        </a>
        <p>{copy.headerLine}</p>
        <div className="header-actions">
          <nav aria-label={copy.navigationLabel}>
            <a href="#perfil">{copy.nav.profile}</a>
            <a href="#atuacao">{copy.nav.capabilities}</a>
            <a href="#projetos">{copy.nav.projects}</a>
            <a href="#contato">{copy.nav.contact}</a>
          </nav>
          <label className="language-picker">
            <span>{copy.languageLabel}</span>
            <select
              value={locale}
              onChange={(event) => changeLocale(event.target.value as Locale)}
              aria-label={copy.languageLabel}
            >
              {localeOptions.map((option) => (
                <option key={option.code} value={option.code} lang={option.lang}>
                  {option.flag} {option.short}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="kicker">Adriano César Moreno Caldas</p>
          <h1 id="hero-title">
            <span className="hero-given">Adriano</span>
            <span className="hero-middle">César Moreno</span>
            <span className="hero-family">Caldas</span>
          </h1>
          <p className="hero-statement">{copy.hero.statement}</p>
          <a className="text-link" href="#perfil">
            {copy.hero.trajectoryLink} <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div
          className="systems-orbit"
          role="img"
          aria-label={copy.hero.orbitAria}
        >
          <div className="orbit-axis" aria-hidden="true" />
          <div className="orbit-center">
            <strong>AC</strong>
            <span>2003 → {copy.hero.now}</span>
          </div>
          <span className="orbit-label label-strategy">{copy.hero.strategy}</span>
          <span className="orbit-label label-software">{copy.hero.software}</span>
          <span className="orbit-label label-ai">{copy.hero.ai}</span>
          <span className="orbit-label label-operations">{copy.hero.operations}</span>
          <span className="orbit-label label-systems">{copy.hero.systems}</span>
          <span className="orbit-coordinate">GLOBAL / 24H</span>
        </div>
      </section>

      <div className="signal-strip" aria-label={copy.signal.label}>
        {copy.signal.items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>

      <section className="profile section-shell" id="perfil">
        <div className="section-tag">
          <span>{copy.profile.label}</span>
          <i>{copy.profile.tag}</i>
        </div>
        <div className="profile-content">
          <h2>{copy.profile.title}</h2>
          <figure className="profile-portrait">
            <div className="portrait-frame">
              <Image
                src="/adriano-caldas.jpeg"
                alt="Adriano César Moreno Caldas"
                width={800}
                height={800}
                sizes="(max-width: 760px) 100vw, 340px"
                unoptimized
              />
              <span aria-hidden="true">AC / 01</span>
            </div>
            <figcaption>
              <span>{copy.profile.portraitLabel}</span>
              <p>{copy.profile.portraitText}</p>
            </figcaption>
          </figure>
          <div className="profile-grid">
            <p className="profile-lead">{copy.profile.lead}</p>
            <div>
              <p>{copy.profile.bodyOne}</p>
              <p>{copy.profile.bodyTwo}</p>
            </div>
          </div>
          <aside className="profile-note">
            <span>{copy.profile.principleLabel}</span>
            <blockquote>“{copy.profile.principle}”</blockquote>
          </aside>
        </div>
      </section>

      <section className="capability-section section-shell" id="atuacao">
        <div className="section-tag">
          <span>{copy.capabilities.label}</span>
          <i>{copy.capabilities.tag}</i>
        </div>
        <div className="capability-content">
          <div className="section-intro">
            <h2>{copy.capabilities.title}</h2>
            <p>{copy.capabilities.intro}</p>
          </div>
          <div className="capability-list">
            {copy.capabilities.items.map((capability) => (
              <article key={capability.code}>
                <span className="capability-code">{capability.code}</span>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
                <small>{capability.topics}</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="projects section-shell" id="projetos">
        <div className="section-tag">
          <span>{copy.projects.label}</span>
          <i>{copy.projects.tag}</i>
        </div>
        <div className="projects-content">
          <div className="section-intro">
            <h2>{copy.projects.title}</h2>
            <p>{copy.projects.intro}</p>
          </div>

          <div className="project-columns">
            <section aria-labelledby="owned-title">
              <div className="project-heading">
                <h3 id="owned-title">{copy.projects.ownedTitle}</h3>
                <span>{String(copy.projects.owned.length).padStart(2, "0")}</span>
              </div>
              <ProjectList projects={copy.projects.owned} />
            </section>
            <section aria-labelledby="collab-title">
              <div className="project-heading">
                <h3 id="collab-title">{copy.projects.collaborationTitle}</h3>
                <span>
                  {String(copy.projects.collaborations.length).padStart(2, "0")}
                </span>
              </div>
              <ProjectList projects={copy.projects.collaborations} />
            </section>
          </div>
        </div>
      </section>

      <section className="trajectory section-shell" id="trajetoria">
        <div className="section-tag">
          <span>{copy.trajectory.label}</span>
          <i>{copy.trajectory.tag}</i>
        </div>
        <div className="trajectory-content">
          <h2>{copy.trajectory.title}</h2>
          <ol>
            {copy.trajectory.items.map((item) => (
              <li key={`${item.time}-${item.title}`}>
                <time>{item.time}</time>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="contact" id="contato">
        <div className="contact-index">{copy.contact.index}</div>
        <div className="contact-body">
          <div className="contact-intro">
            <p>{copy.contact.eyebrow}</p>
            <h2>{copy.contact.title}</h2>
            <p className="contact-copy">{copy.contact.intro}</p>
            <p className="contact-protection">
              <span aria-hidden="true" /> {copy.contact.protectedLabel}
            </p>
          </div>
          <ContactForm locale={locale} copy={copy.contact.form} />
        </div>
      </section>

      <footer>
        <a className="monogram" href="#inicio" aria-label={copy.footer.back}>
          AC<span>/</span>
        </a>
        <p>© {new Date().getFullYear()} Adriano César Moreno Caldas</p>
        <p>{copy.footer.privacyNote}</p>
        <div>
          <a href={`https://cinteca.es/?lang=${locale}#aviso-legal`}>
            {copy.footer.legal}
          </a>
          <a href={`https://cinteca.es/?lang=${locale}#privacidad`}>
            {copy.footer.privacy}
          </a>
        </div>
      </footer>
    </main>
  );
}
