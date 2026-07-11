import { uiText } from "../uiText.js";

export default function StartScreen({ tenant, onStart, selectedSource, onSelectSource }) {
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
        <div style={{ maxWidth: 320, margin: "0 auto 24px" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
              marginBottom: 6,
            }}
          >
            Weine anzeigen von
          </label>
          <select
            value={selectedSource || ""}
            onChange={(e) => onSelectSource(e.target.value || null)}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid #3a312a",
              background: "var(--color-card-bg)",
              color: "var(--color-card-text)",
            }}
          >
            {demoOptions.map((opt) => (
              <option key={opt.slug} value={opt.slug}>
                {opt.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <h1>{content.headline}</h1>
      <p style={{ fontStyle: "italic" }}>{content.subheadlineTemplate}</p>
      <p>{content.description}</p>
      <button className="cta-button" onClick={onStart}>
        {content.ctaLabel}
      </button>
      <div className="cta-support">{content.ctaSupportText}</div>
    </div>
  );
}
