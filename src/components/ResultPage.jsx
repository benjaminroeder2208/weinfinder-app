import { useState } from "react";
import { uiText } from "../uiText.js";
import { tasteProfile, buildWhyText } from "../matchExplain.js";
import { submitLead } from "../api/client.js";

function TasteBars({ wine }) {
  const profile = tasteProfile(wine);
  const rows = [
    { label: "Frucht", value: profile.frucht },
    { label: "Körper", value: profile.koerper },
    { label: "Frische", value: profile.frische },
  ];
  return (
    <div>
      <h3 style={{ fontSize: "0.9rem", marginTop: 24 }}>
        {uiText.tasteProfileLabel}
      </h3>
      {rows.map((row) => (
        <div key={row.label}>
          <div className="taste-bar-label">
            <span>{row.label}</span>
          </div>
          <div className="taste-bar-track">
            <div className="taste-bar-fill" style={{ width: `${row.value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function TopWineCard({ wine, answers, quizConfig }) {
  return (
    <div className="result-card">
      <div className="result-label">{uiText.topRecommendationLabel}</div>
      <div className="result-header">
        <div>
          <h2 style={{ marginBottom: 4 }}>{wine.name}</h2>
          <p style={{ margin: 0 }}>{wine.weingut}</p>
          <p style={{ margin: "4px 0", fontSize: "0.85rem" }}>
            {wine.grape_variety} · {wine.region} · {wine.vintage} · {wine.alcohol}
          </p>
        </div>
      </div>
      <p>{wine.description}</p>
      {wine.aroma_notes?.length > 0 && (
        <p style={{ fontSize: "0.85rem" }}>
          Aromen: {wine.aroma_notes.join(", ")}
        </p>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <div className="result-price">
          {parseFloat(wine.price).toFixed(2).replace(".", ",")} €
        </div>
        <a
          className="shop-link-button"
          href={wine.link}
          target="_blank"
          rel="noreferrer"
        >
          {uiText.ctaWineLabel}
        </a>
      </div>
      <TasteBars wine={wine} />
      {wine.food_pairing?.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: "0.8rem", marginBottom: 8 }}>
            {uiText.foodPairingLabel}
          </div>
          {wine.food_pairing.map((f) => (
            <span key={f} className="tag">
              {f}
            </span>
          ))}
        </div>
      )}
      <div className="why-box">
        <div style={{ fontSize: "0.8rem", marginBottom: 6, color: "var(--color-card-text)", opacity: 0.75 }}>
          {uiText.whyThisWineLabel}
        </div>
        <p>„{buildWhyText(wine, answers, quizConfig)}"</p>
      </div>
    </div>
  );
}

function AlternativeCard({ wine, label }) {
  return (
    <div>
      <div className="result-label">{label}</div>
      <div className="alternative-card">
        <div>
          <strong>{wine.name}</strong>
          <p style={{ margin: "2px 0 0", fontSize: "0.85rem" }}>{wine.weingut}</p>
          <p style={{ margin: "2px 0 0", fontSize: "0.8rem" }}>{wine.description}</p>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
          <div style={{ color: "var(--color-accent)", fontWeight: 700, marginBottom: 6 }}>
            {parseFloat(wine.price).toFixed(2).replace(".", ",")} €
          </div>
          <a
            className="shop-link-button"
            href={wine.link}
            target="_blank"
            rel="noreferrer"
          >
            {uiText.ctaWineLabel}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ResultPage({ result, answers, quizConfig, tenant, onRestart }) {
  const HIDDEN_LEAD_CAPTURE_TIERS = ["basis", "pilot"];
  const leadCaptureEnabled = !HIDDEN_LEAD_CAPTURE_TIERS.includes(tenant?.pricing_tier);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState(null);

  if (!result?.top) {
    return (
      <div className="screen">
        <div className="error-box">
          Für diese Kombination konnten wir aktuell keine Empfehlung finden.
        </div>
        <span className="restart-link" onClick={onRestart}>
          {uiText.restartLabel}
        </span>
      </div>
    );
  }

  const wineLink = result.top.link;

  return (
    <div className="screen">
      <h1>{uiText.resultHeadline}</h1>
      <p style={{ color: "var(--color-text)" }}>{uiText.resultIntro}</p>

      <TopWineCard wine={result.top} answers={answers} quizConfig={quizConfig} />

      {result.alternatives?.map((wine) => (
        <AlternativeCard
          key={wine.id}
          wine={wine}
          label={uiText.alternativesLabel}
        />
      ))}

      {result.valueTip && (
        <AlternativeCard wine={result.valueTip} label={uiText.valueTipLabel} />
      )}

      {leadCaptureEnabled && (
        <div className="result-card">
          {!sent ? (
            <>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>
                ✉️ Empfehlung speichern
              </div>
              <p style={{ marginBottom: 12 }}>
                Hinterlasse deine E-Mail-Adresse, damit wir dich zu dieser Empfehlung kontaktieren können.
              </p>
              {sendError && (
                <p style={{ color: "#c0394a", fontSize: "0.85rem" }}>{sendError}</p>
              )}
              <input
                type="email"
                placeholder="deine@email.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="lead-input"
              />
              <label
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 8,
                  fontSize: "0.8rem",
                  color: "var(--color-card-text)",
                  marginBottom: 12,
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  style={{ width: "auto", marginTop: 2 }}
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                />
                Ich bin einverstanden, dass {tenant?.name || "der Weinshop"} mich unter
                dieser E-Mail-Adresse zu meiner Anfrage kontaktiert.
              </label>
              <button
                className="cta-button"
                onClick={async () => {
                  setSendError(null);
                  setSending(true);
                  try {
                    await submitLead(tenant.slug, {
                      email,
                      wineId: result.top.id,
                      answers,
                      consent,
                    });
                    setSent(true);
                  } catch (err) {
                    setSendError(err.message);
                  } finally {
                    setSending(false);
                  }
                }}
                disabled={!email || !consent || sending}
              >
                {sending ? "Sendet..." : "Empfehlung senden"}
              </button>
            </>
          ) : (
            <p>Danke! Wir haben deine Anfrage gespeichert.</p>
          )}
        </div>
      )}

      <div style={{ textAlign: "center", marginTop: 24 }}>
        <div style={{ marginBottom: 12, fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
          {uiText.shareLabel}
        </div>
        <a
          href={`https://wa.me/?text=${encodeURIComponent(
            `Meine Weinempfehlung: ${result.top.name} – ${wineLink}`
          )}`}
          target="_blank"
          rel="noreferrer"
          className="cta-button"
          style={{ marginRight: 8, background: "#25D366" }}
        >
          {uiText.whatsappLabel}
        </a>
        <a
          href={`mailto:?subject=${encodeURIComponent(
            "Meine persönliche Weinempfehlung"
          )}&body=${encodeURIComponent(
            `Ich habe eine Weinempfehlung für dich: ${result.top.name}\n\n${wineLink}`
          )}`}
          className="cta-button btn-neutral"
        >
          {uiText.emailShareLabel}
        </a>
      </div>

      <span className="restart-link" onClick={onRestart}>
        {uiText.restartLabel}
      </span>
    </div>
  );
}
