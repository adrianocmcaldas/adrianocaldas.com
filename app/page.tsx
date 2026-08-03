"use client";

import Image from "next/image";
import {
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import ContactForm from "./contact-form";
import {
  localeOptions,
  resolveLocale,
  translations,
  type Locale,
  type Project,
} from "./i18n";

function projectDomain(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

// Signature motif: an oscilloscope/ECG trace. The hero variant carries a dim
// electric echo and a travelling amber pulse (CSS-driven, reduced-motion safe);
// the mini variant is the section-header divider segment.
const HERO_TRACE =
  "M0 48H430l16-9 16 9h52l12-34 16 68 14-52 13 18h46l13-11 15 11h74l11-7 13 7H1200";

function SignalLine({
  variant = "hero",
  className,
}: {
  variant?: "hero" | "mini";
  className?: string;
}) {
  const classes = [
    "signal-line",
    variant === "mini" ? "signal-line-mini" : "signal-line-hero",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (variant === "mini") {
    return (
      <svg
        className={classes}
        viewBox="0 0 96 24"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path d="M0 13h30l5-4 5 4h9l5-9 6 15 5-10 5 4h26" />
      </svg>
    );
  }

  return (
    <svg
      className={classes}
      viewBox="0 0 1200 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <path className="signal-echo" d={HERO_TRACE} transform="translate(0 8)" />
      <path className="signal-main" d={HERO_TRACE} />
      <path className="signal-pulse" d={HERO_TRACE} pathLength={1000} />
    </svg>
  );
}

function ProjectList({
  projects,
  live = false,
}: {
  projects: Project[];
  live?: boolean;
}) {
  return (
    <div className="project-list">
      {projects.map((project, index) => (
        <a
          className="project-row"
          href={project.url}
          target="_blank"
          rel="noreferrer"
          key={project.url}
          data-reveal=""
        >
          <span className="project-index">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="project-name">
            {live ? <span className="project-live" aria-hidden="true" /> : null}
            {project.name}
            {project.tag ? (
              <span className="project-tag">{project.tag}</span>
            ) : null}
          </span>
          <small>{project.descriptor}</small>
          <span className="project-domain">{projectDomain(project.url)}</span>
          <i aria-hidden="true">↗</i>
        </a>
      ))}
    </div>
  );
}

function closeMobileNav(event: MouseEvent<HTMLAnchorElement>) {
  event.currentTarget.closest("details")?.removeAttribute("open");
}

// Hydration-safe current year: the static export bakes the build-time year in,
// and the client swaps in its own year after hydration without a mismatch.
const emptySubscribe = () => () => {};
const getClientYear = () => new Date().getFullYear();
const getBuildYear = () => 2026;

export default function Home() {
  const [locale, setLocale] = useState<Locale>("en");
  const copy = translations[locale];
  const currentYear = useSyncExternalStore(
    emptySubscribe,
    getClientYear,
    getBuildYear,
  );

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

  useEffect(() => {
    if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) {
      return;
    }

    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (revealTargets.length === 0) return;

    // Only content below the first viewport is ever hidden; a rAF-throttled
    // sweep on scroll/resize/hashchange reveals everything whose top edge has
    // crossed the viewport bottom. Instant anchor jumps can therefore never
    // strand content invisible, in any scroll direction.
    const pendingTimeouts = new Set<number>();
    const groupSizes = new Map<HTMLElement | null, number>();
    const revealDelays = new Map<HTMLElement, number>();
    const hidden = new Set<HTMLElement>();
    const revealLimit = () => window.innerHeight - 40;

    for (const target of revealTargets) {
      const groupIndex = groupSizes.get(target.parentElement) ?? 0;
      groupSizes.set(target.parentElement, groupIndex + 1);

      if (target.getBoundingClientRect().top > revealLimit()) {
        const delay = Math.min(groupIndex * 50, 350);
        revealDelays.set(target, delay);
        target.style.transitionDelay = `${delay}ms`;
        target.classList.add("reveal-init");
        hidden.add(target);
      }
    }

    const restore = (target: HTMLElement) => {
      target.classList.remove("reveal-init", "is-revealed");
      target.style.removeProperty("transition-delay");
    };

    let sweepFrame = 0;
    const sweep = () => {
      sweepFrame = 0;
      const limit = revealLimit();
      for (const target of Array.from(hidden)) {
        if (target.getBoundingClientRect().top > limit) continue;
        hidden.delete(target);
        target.classList.add("is-revealed");
        const settleTimeout = window.setTimeout(() => {
          pendingTimeouts.delete(settleTimeout);
          restore(target);
        }, 650 + (revealDelays.get(target) ?? 0));
        pendingTimeouts.add(settleTimeout);
      }
      if (hidden.size === 0) detach();
    };
    const requestSweep = () => {
      if (sweepFrame === 0) sweepFrame = window.requestAnimationFrame(sweep);
    };
    const detach = () => {
      window.removeEventListener("scroll", requestSweep);
      window.removeEventListener("resize", requestSweep);
      window.removeEventListener("hashchange", requestSweep);
    };

    window.addEventListener("scroll", requestSweep, { passive: true });
    window.addEventListener("resize", requestSweep, { passive: true });
    window.addEventListener("hashchange", requestSweep);
    requestSweep();

    return () => {
      detach();
      window.cancelAnimationFrame(sweepFrame);
      for (const timeout of pendingTimeouts) window.clearTimeout(timeout);
      for (const target of revealTargets) restore(target);
    };
  }, []);

  const personJsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": "https://adrianocaldas.com/#person",
      name: "Adriano César Moreno Caldas",
      alternateName: "Adriano Caldas",
      url: "https://adrianocaldas.com",
      image: "https://adrianocaldas.com/adriano-caldas.jpeg",
      sameAs: ["https://github.com/adrianocmcaldas"],
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

  const navAnchors = [
    { href: "#perfil", label: copy.nav.profile },
    { href: "#atuacao", label: copy.nav.capabilities },
    { href: "#projetos", label: copy.nav.projects },
    { href: "#trajetoria", label: copy.nav.trajectory },
    { href: "#contato", label: copy.nav.contact },
  ];

  // The five channels of the old orbit diagram, kept as console chips with the
  // same anchors and the same localized labels.
  const channelChips = [
    { href: "#dir", label: copy.hero.strategy },
    { href: "#sft", label: copy.hero.software },
    { href: "#aim", label: copy.hero.ai },
    { href: "#cld", label: copy.hero.operations },
    { href: "#aut", label: copy.hero.systems },
  ];

  const readoutRows = [
    { label: copy.signal.items[0], value: `2003 → ${copy.hero.now}` },
    {
      label: copy.signal.items[1],
      value: String(copy.projects.owned.length).padStart(2, "0"),
    },
    {
      label: copy.console.collaborations,
      value: String(copy.projects.collaborations.length).padStart(2, "0"),
    },
  ];

  const signalCells = [
    { value: `2003 → ${currentYear}`, label: copy.signal.items[0] },
    {
      value: String(copy.projects.owned.length).padStart(2, "0"),
      label: copy.signal.items[1],
    },
    {
      value: String(copy.projects.collaborations.length).padStart(2, "0"),
      label: copy.signal.items[2],
    },
    {
      value: `${String(localeOptions.length).padStart(2, "0")} / GLOBAL`,
      label: copy.signal.items[3],
    },
  ];

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
            {navAnchors.map((anchor, index) => (
              <a key={anchor.href} href={anchor.href}>
                <span aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {anchor.label}
              </a>
            ))}
            <details className="mobile-nav">
              <summary>{copy.nav.menu}</summary>
              <ul>
                {navAnchors.map((anchor, index) => (
                  <li key={anchor.href}>
                    <a href={anchor.href} onClick={closeMobileNav}>
                      <span aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {anchor.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
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
                  {`${option.short} · ${option.label}`}
                </option>
              ))}
            </select>
          </label>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-hud">
          <span className="hud-corner hud-tl">
            <b>AC /</b> Adriano Caldas · {copy.console.channel} 01 —{" "}
            {copy.nav.profile}
          </span>
          <span className="hud-corner hud-tr">
            2003 ⟶ {currentYear} · {copy.hero.coordinate}
          </span>
          <span className="hud-corner hud-bl">{copy.hero.kicker}</span>
          <span className="hud-corner hud-br">
            PT·EN·ES·NO · {copy.console.protectedContact}
          </span>
        </div>

        <SignalLine className="hero-signal" />

        <div className="hero-copy">
          <h1 id="hero-title">
            <span className="hero-given">Adriano</span>
            <span className="hero-middle">César Moreno</span>
            <span className="hero-family">Caldas</span>
          </h1>
          <p className="hero-statement">
            <span aria-hidden="true">» </span>
            {copy.hero.statement}
          </p>
          <nav className="hero-channels" aria-label={copy.hero.orbitAria}>
            {channelChips.map((chip) => (
              <a key={chip.href} href={chip.href}>
                {chip.label}
              </a>
            ))}
          </nav>
          <a className="text-link" href="#trajetoria">
            {copy.hero.trajectoryLink} <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div
          className="hero-readout"
          role="group"
          aria-label={copy.console.readout}
        >
          <p className="readout-title">AC / {copy.console.readout}</p>
          <dl>
            {readoutRows.map((row) => (
              <div key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
            <div className="readout-status">
              <dt>{copy.console.status}</dt>
              <dd>
                <span className="readout-live" aria-hidden="true" />
                {copy.console.statusValue}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="signal-strip" role="group" aria-label={copy.signal.label}>
        {signalCells.map((cell) => (
          <div className="signal-cell" key={cell.label}>
            <strong>{cell.value}</strong>
            <span>{cell.label}</span>
          </div>
        ))}
      </div>

      <section className="profile section-shell" id="perfil">
        <div className="section-tag">
          <SignalLine variant="mini" />
          <span className="section-channel">
            {copy.console.channel} 01 — {copy.profile.label}
          </span>
          <span className="section-note">{copy.profile.tag}</span>
        </div>
        <h2 data-reveal="">{copy.profile.title}</h2>
        <div className="profile-grid">
          <figure className="profile-portrait" data-reveal="">
            <div className="portrait-frame">
              <Image
                src="/adriano-caldas.jpeg"
                alt="Adriano César Moreno Caldas"
                width={800}
                height={800}
                sizes="(max-width: 760px) 100vw, 380px"
                unoptimized
              />
              <span aria-hidden="true">AC / 01</span>
            </div>
            <figcaption>
              <span>{copy.profile.portraitLabel}</span>
              <p>{copy.profile.portraitText}</p>
            </figcaption>
          </figure>
          <div className="profile-body">
            <p className="profile-lead">{copy.profile.lead}</p>
            <p>{copy.profile.bodyOne}</p>
            <p>{copy.profile.bodyTwo}</p>
            <aside className="profile-note">
              <span>{copy.profile.principleLabel}</span>
              <blockquote>
                <span className="log-quote" aria-hidden="true">
                  “
                </span>
                {copy.profile.principle}
                <span className="log-quote" aria-hidden="true">
                  ”
                </span>
              </blockquote>
            </aside>
          </div>
        </div>
      </section>

      <section className="capability-section section-shell" id="atuacao">
        <div className="section-tag">
          <SignalLine variant="mini" />
          <span className="section-channel">
            {copy.console.channel} 02 — {copy.capabilities.label}
          </span>
          <span className="section-note">{copy.capabilities.tag}</span>
        </div>
        <div className="section-intro">
          <h2 data-reveal="">{copy.capabilities.title}</h2>
          <p>{copy.capabilities.intro}</p>
        </div>
        <div className="capability-list">
          {copy.capabilities.items.map((capability) => (
            <article
              key={capability.code}
              id={capability.code.toLowerCase()}
              data-reveal=""
            >
              <span className="capability-code">{capability.code}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <small>{capability.topics}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="projects section-shell" id="projetos">
        <div className="section-tag">
          <SignalLine variant="mini" />
          <span className="section-channel">
            {copy.console.channel} 03 — {copy.projects.label}
          </span>
          <span className="section-note">{copy.projects.tag}</span>
        </div>
        <div className="section-intro">
          <h2 data-reveal="">{copy.projects.title}</h2>
          <p>{copy.projects.intro}</p>
        </div>

        <div className="project-columns">
          <section aria-labelledby="owned-title">
            <div className="project-heading">
              <h3 id="owned-title">{copy.projects.ownedTitle}</h3>
              <span>{String(copy.projects.owned.length).padStart(2, "0")}</span>
            </div>
            <ProjectList projects={copy.projects.owned} live />
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
      </section>

      <section className="trajectory section-shell" id="trajetoria">
        <div className="section-tag">
          <SignalLine variant="mini" />
          <span className="section-channel">
            {copy.console.channel} 04 — {copy.trajectory.label}
          </span>
          <span className="section-note">{copy.trajectory.tag}</span>
        </div>
        <h2 data-reveal="">{copy.trajectory.title}</h2>
        <ol>
          {copy.trajectory.items.map((item, index) => (
            <li key={index} data-reveal="">
              <time>{item.time}</time>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="contact section-shell" id="contato">
        <div className="contact-panel">
          <div className="section-tag">
            <SignalLine variant="mini" />
            <span className="section-channel">
              {copy.console.channel} 05 — {copy.nav.contact}
            </span>
            <span className="section-note">{copy.console.secureChannel}</span>
          </div>
          <div className="contact-body">
            <div className="contact-intro">
              <p>{copy.contact.eyebrow}</p>
              <h2 data-reveal="">{copy.contact.title}</h2>
              <p className="contact-copy">{copy.contact.intro}</p>
              <p className="contact-protection">
                <span aria-hidden="true" /> {copy.contact.protectedLabel}
              </p>
            </div>
            <ContactForm locale={locale} copy={copy.contact.form} />
          </div>
        </div>
      </section>

      <footer>
        <a className="monogram" href="#inicio" aria-label={copy.footer.back}>
          AC<span>/</span>
        </a>
        <p>© {currentYear} Adriano César Moreno Caldas</p>
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
