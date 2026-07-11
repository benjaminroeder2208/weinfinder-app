import { uiText } from "../uiText.js";

export default function StartScreen({ tenant, onStart, selectedSources, onToggleSource }) {
  const content = { ...uiText, ...tenant?.content };
  const demoOptions = tenant?.demo_options || [];
  const isDemo = tenant?.pricing_tier === "demo" && demoOptions.length > 0;

  return (
    <div className="screen start-screen">
      {content.logoUrl ? (
        <img
          src={content.logoUrl}
          alt={tenant?.name || "Logo"}
          style={{ maxHeight: 64, marginBottom: 16 }}
        />
      ) : (
        <div className="wine-emoji">🍷</div>
      )}

      {isDemo && (
        <div style={{ maxWidth: 360, margin: "0 auto 24px", textAlign: "left" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
              marginBottom: 6,
              textAlign: "center",
            }}
          >
            Weine anzeigen von (1 oder mehrere auswählen)
          </label>
          <div
            style={{
              border: "1px solid #3a312a",
              borderRadius: 8,
              padding: 12,
              background: "var(--color-card-bg)",
            }}
          >
            {demoOptions.map((opt) => (
              <label
                key={opt.slug}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: "0.9rem",
                  color: "var(--color-card-text)",
                  padding: "4px 0",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  style={{ width: "auto" }}
                  checked={selectedSources.includes(opt.slug)}
                  onChange={() => onToggleSource(opt.slug)}
                />
                {opt.name}
              </label>
            ))}
          </div>
        </div>
      )}

      <h1>{content.headline}</h1>
      <p className="start-subheadline">{content.subheadlineTemplate}</p>
      <p className="start-description">{content.description}</p>
      <button
        className="cta-button"
        onClick={onStart}
        disabled={isDemo && selectedSources.length === 0}
      >
        {content.ctaLabel}
      </button>
      <div className="cta-support">{content.ctaSupportText}</div>
    </div>
  );
}
