// Berechnet, ob schwarzer oder weißer Text auf einer Hintergrundfarbe
// besser lesbar ist (relative Luminanz, WCAG-Näherung).
export function contrastingTextColor(hex) {
  if (!hex) return "#1c1612";
  const clean = hex.replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const r = parseInt(full.substring(0, 2), 16) / 255;
  const g = parseInt(full.substring(2, 4), 16) / 255;
  const b = parseInt(full.substring(4, 6), 16) / 255;
  const lin = (c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));
  const luminance = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  return luminance > 0.5 ? "#1c1612" : "#ffffff";
}

// Setzt die Branding-Farben eines Tenants als CSS-Variablen auf das Dokument -
// wird sowohl vom Quiz/Ergebnis-Flow als auch von der Datenschutzseite genutzt,
// damit beide konsistent im Kunden-Theme erscheinen.
export function applyBranding(branding = {}) {
  const root = document.documentElement.style;
  if (branding.backgroundColor) root.setProperty("--color-bg", branding.backgroundColor);
  if (branding.textColor) root.setProperty("--color-text", branding.textColor);
  if (branding.headingColor) root.setProperty("--color-heading", branding.headingColor);
  if (branding.primaryColor) {
    root.setProperty("--color-accent", branding.primaryColor);
    root.setProperty("--color-on-primary", contrastingTextColor(branding.primaryColor));
  }
  if (branding.secondaryColor) {
    root.setProperty("--color-secondary", branding.secondaryColor);
    root.setProperty("--color-on-secondary", contrastingTextColor(branding.secondaryColor));
  }
  if (branding.cardBackgroundColor) root.setProperty("--color-card-bg", branding.cardBackgroundColor);
  if (branding.cardTextColor) root.setProperty("--color-card-text", branding.cardTextColor);
}
