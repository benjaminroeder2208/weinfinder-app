import { uiText } from "../uiText.js";

export default function StartScreen({ tenant, onStart }) {
  return (
    <div className="screen start-screen">
      <div className="wine-emoji">🍷</div>
      <h1>{uiText.headline}</h1>
      <p style={{ fontStyle: "italic" }}>{uiText.subheadlineTemplate}</p>
      <p>{uiText.description}</p>
      <button className="cta-button" onClick={onStart}>
        {uiText.ctaLabel}
      </button>
      <div className="cta-support">{uiText.ctaSupportText}</div>
      {tenant?.name && (
        <p style={{ marginTop: 32, fontSize: "0.8rem" }}>
          präsentiert von {tenant.name}
        </p>
      )}
    </div>
  );
}
