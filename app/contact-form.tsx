"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import type { ContactCopy, Locale } from "./i18n";

const contactEndpoint =
  "https://u33x6xbn7dq2l5jn66hvv7ovc40bgiye.lambda-url.eu-central-1.on.aws/";
const configuredTurnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";
const localTurnstileSiteKey = "1x00000000000000000000AA";

type ContactStatus = "idle" | "sending" | "success" | "error" | "turnstile";

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: "dark";
      size: "flexible";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

function TurnstileWidget({
  siteKey,
  label,
  resetSignal,
  onToken,
  onError,
}: {
  siteKey: string;
  label: string;
  resetSignal: number;
  onToken: (token: string) => void;
  onError: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!siteKey) return;

    let active = true;
    const renderWidget = () => {
      if (
        !active ||
        !containerRef.current ||
        !window.turnstile ||
        widgetIdRef.current
      ) {
        return;
      }

      widgetIdRef.current = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        action: "contact",
        theme: "dark",
        size: "flexible",
        callback: onToken,
        "expired-callback": () => onToken(""),
        "error-callback": () => {
          onToken("");
          onError();
        },
      });
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      "script[data-adriano-turnstile]",
    );

    if (window.turnstile) {
      renderWidget();
    } else if (existingScript) {
      existingScript.addEventListener("load", renderWidget, { once: true });
    } else {
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.dataset.adrianoTurnstile = "true";
      script.addEventListener("load", renderWidget, { once: true });
      script.addEventListener("error", onError, { once: true });
      document.head.appendChild(script);
    }

    return () => {
      active = false;
      existingScript?.removeEventListener("load", renderWidget);
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [onError, onToken, siteKey]);

  useEffect(() => {
    if (resetSignal > 0 && widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }, [resetSignal]);

  return (
    <div className="turnstile-field">
      <span>{label}</span>
      <div ref={containerRef} />
    </div>
  );
}

export default function ContactForm({
  locale,
  copy,
}: {
  locale: Locale;
  copy: ContactCopy;
}) {
  const [turnstileSiteKey, setTurnstileSiteKey] = useState(
    configuredTurnstileSiteKey,
  );
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileReset, setTurnstileReset] = useState(0);
  const [contactStatus, setContactStatus] = useState<ContactStatus>("idle");

  useEffect(() => {
    if (configuredTurnstileSiteKey || turnstileSiteKey) return;
    if (
      window.location.hostname !== "localhost" &&
      window.location.hostname !== "127.0.0.1"
    ) {
      return;
    }

    const updateFrame = window.requestAnimationFrame(() => {
      setTurnstileSiteKey(localTurnstileSiteKey);
    });
    return () => window.cancelAnimationFrame(updateFrame);
  }, [turnstileSiteKey]);

  const handleTurnstileToken = useCallback((token: string) => {
    setTurnstileToken(token);
    if (token) setContactStatus("idle");
  }, []);

  const handleTurnstileError = useCallback(() => {
    setContactStatus("turnstile");
  }, []);

  async function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!turnstileSiteKey || !turnstileToken) {
      setContactStatus("turnstile");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    setContactStatus("sending");

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website"),
          privacyAccepted: formData.get("privacy") === "on",
          turnstileToken,
          language: locale,
          site: "adrianocaldas",
        }),
      });

      if (!response.ok) throw new Error("contact-delivery-failed");

      form.reset();
      setContactStatus("success");
    } catch {
      setContactStatus("error");
    } finally {
      setTurnstileToken("");
      setTurnstileReset((current) => current + 1);
    }
  }

  const feedbackMessage =
    contactStatus === "success"
      ? copy.success
      : contactStatus === "turnstile"
        ? copy.turnstileError
        : contactStatus === "error"
          ? copy.error
          : "";
  const feedbackTone =
    contactStatus === "success"
      ? " success"
      : contactStatus === "error" || contactStatus === "turnstile"
        ? " error"
        : "";

  return (
    <form className="contact-form" onSubmit={submitContact}>
      <div className="contact-form-grid">
        <label>
          <span>{copy.name}</span>
          <input
            name="name"
            type="text"
            minLength={2}
            maxLength={100}
            autoComplete="name"
            required
          />
        </label>
        <label>
          <span>{copy.email}</span>
          <input
            name="email"
            type="email"
            maxLength={254}
            autoComplete="email"
            required
          />
        </label>
        <label>
          <span>
            {copy.company} <small>{copy.optional}</small>
          </span>
          <input
            name="company"
            type="text"
            maxLength={120}
            autoComplete="organization"
          />
        </label>
        <label>
          <span>{copy.subject}</span>
          <input
            name="subject"
            type="text"
            minLength={3}
            maxLength={160}
            required
          />
        </label>
        <label className="contact-message">
          <span>{copy.message}</span>
          <textarea
            name="message"
            minLength={20}
            maxLength={5000}
            rows={7}
            required
          />
        </label>
      </div>

      <label className="contact-honeypot" aria-hidden="true">
        Website
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>

      <label className="privacy-check">
        <input name="privacy" type="checkbox" required />
        <span>
          {copy.privacyAcknowledgement}{" "}
          <a
            href={`https://cinteca.es/?lang=${locale}#privacidad`}
            target="_blank"
            rel="noreferrer"
          >
            {copy.privacyLink}
          </a>
          .
        </span>
      </label>

      {turnstileSiteKey ? (
        <TurnstileWidget
          siteKey={turnstileSiteKey}
          label={copy.verification}
          resetSignal={turnstileReset}
          onToken={handleTurnstileToken}
          onError={handleTurnstileError}
        />
      ) : (
        <p className="contact-feedback error" role="alert">
          {copy.configurationError}
        </p>
      )}

      <div className="contact-submit">
        <button
          type="submit"
          disabled={
            contactStatus === "sending" ||
            !turnstileSiteKey ||
            !turnstileToken
          }
        >
          {contactStatus === "sending" ? copy.sending : copy.send}
          <span aria-hidden="true">↗</span>
        </button>

        <p className={`contact-feedback${feedbackTone}`} aria-live="polite">
          {feedbackMessage}
        </p>
      </div>
    </form>
  );
}
