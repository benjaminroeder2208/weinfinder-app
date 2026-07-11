import { uiText } from "../uiText.js";

export default function StartScreen({ tenant, onStart }) {
  const content = { ...uiText, ...tenant?.content };

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
