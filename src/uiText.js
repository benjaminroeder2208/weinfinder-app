// Feste UI-Texte, die für alle Tenants gleich sind.
// Tenant-spezifisch sind nur: Name, Branding-Farbe, Quiz-Fragen und Weine.
// Fallback-Werte, falls ein Tenant für ein Feld keinen eigenen Content hinterlegt hat.
// Startseiten-Texte und Logo kommen künftig aus tenant.content (siehe App.jsx),
// alles andere hier bleibt fest für alle Shops gleich.
export const uiText = {
  headline: "Weinfinder",
  subheadlineTemplate: "Finde den Wein, der wirklich zu deinem Geschmack passt.",
  description:
    "Beantworte wenige kurze Fragen und erhalte eine persönliche Weinempfehlung – fast wie im Gespräch mit einem Sommelier.",
  ctaLabel: "Weinberatung starten",
  ctaSupportText: "Schnell, einfach und individuell",
  logoUrl: "",
  resultHeadline: "Dein persönliches Wein-Match",
  resultIntro:
    "Basierend auf deinem Geschmack, Anlass und deinen Vorlieben empfehlen wir dir diese Weine.",
  topRecommendationLabel: "Top Empfehlung",
  alternativesLabel: "Ähnliche Alternative",
  valueTipLabel: "Preis-Leistungs-Tipp",
  shareLabel: "Ergebnis teilen",
  restartLabel: "Nochmal starten",
  questionPrefix: "Frage",
  questionSuffix: "von",
  ctaWineLabel: "Zum Wein",
  whatsappLabel: "WhatsApp",
  shareButtonLabel: "Teilen",
  copiedLabel: "Kopiert!",
  emailShareLabel: "Per E-Mail teilen",
  foodPairingLabel: "Passt besonders gut zu",
  tasteProfileLabel: "Geschmacksprofil",
  whyThisWineLabel: "Warum dieser Wein zu dir passt",
};
