import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getConfig, getPlatformSettings } from "../api/client.js";
import { applyBranding } from "../branding.js";

export default function PrivacyPage() {
  const { slug } = useParams();
  const [tenant, setTenant] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getConfig(slug)
      .then((data) => {
        setTenant(data);
        applyBranding(data.branding);
      })
      .catch((err) => setError(err.message));
    getPlatformSettings().then(setPlatform).catch(() => setPlatform({}));
  }, [slug]);

  if (error) return <div className="screen"><div className="error-box">{error}</div></div>;
  if (!tenant || !platform) return <div className="screen"><p>Lädt...</p></div>;

  const legal = tenant.legal_config || {};
  const retention = legal.retentionMonths || 6;
  const contact = tenant.email_config?.replyTo || "(keine Kontaktadresse hinterlegt)";
  const textStyle = { color: "var(--color-text)" };

  return (
    <div className="screen" style={{ textAlign: "left", maxWidth: 640 }}>
      <h1>Datenschutzhinweise – {tenant.name}</h1>
      <p style={textStyle}>
        Diese Hinweise erklären, welche Daten beim Ausfüllen des Weinfinder-Quiz
        bei <strong>{tenant.name}</strong> verarbeitet werden.
      </p>

      <h3 style={{ marginTop: 24 }}>Verantwortliche Stelle</h3>
      <p style={textStyle}>
        {tenant.name}
        {legal.postalAddress ? (
          <>
            <br />
            {legal.postalAddress.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </>
        ) : null}
        <br />
        Kontakt: {contact}
      </p>

      <h3 style={{ marginTop: 24 }}>Welche Daten werden verarbeitet?</h3>
      <p style={textStyle}>
        Beim Ausfüllen des Quiz werden deine Antworten (z. B. Anlass, Geschmacksstil,
        Preisvorstellung) verarbeitet, um dir eine Weinempfehlung zu berechnen. Falls
        du dich für die Zusendung der Empfehlung per E-Mail entscheidest, wird
        zusätzlich deine E-Mail-Adresse gespeichert.
      </p>

      <h3 style={{ marginTop: 24 }}>Zweck und Rechtsgrundlage</h3>
      <p style={textStyle}>
        Die Verarbeitung erfolgt auf Grundlage deiner ausdrücklichen Einwilligung
        (Art. 6 Abs. 1 lit. a DSGVO), um dir die angeforderte Weinempfehlung
        zuzusenden und dir bei Rückfragen antworten zu können.
      </p>

      <h3 style={{ marginTop: 24 }}>Speicherdauer</h3>
      <p style={textStyle}>
        Deine E-Mail-Adresse wird für maximal {retention} Monate gespeichert und
        anschließend automatisch gelöscht, sofern du deine Einwilligung nicht
        vorher widerrufst.
      </p>

      <h3 style={{ marginTop: 24 }}>Technischer Dienstleister (Auftragsverarbeiter)</h3>
      <p style={textStyle}>
        Die technische Bereitstellung des Weinfinder-Tools erfolgt durch:
        <br />
        {platform.operator_name || "(Betreiberangaben noch nicht hinterlegt)"}
        {platform.operator_address ? (
          <>
            <br />
            {platform.operator_address.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </>
        ) : null}
        {platform.operator_contact_email ? (
          <>
            <br />
            Kontakt: {platform.operator_contact_email}
          </>
        ) : null}
      </p>
      <p style={textStyle}>
        Es besteht ein Auftragsverarbeitungsvertrag nach Art. 28 DSGVO zwischen{" "}
        {tenant.name} und diesem Dienstleister. Eine Weitergabe deiner Daten an
        weitere Dritte erfolgt nicht.
      </p>

      <h3 style={{ marginTop: 24 }}>Deine Rechte</h3>
      <p style={textStyle}>
        Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung
        der Verarbeitung deiner Daten sowie auf Datenübertragbarkeit. Deine
        Einwilligung kannst du jederzeit formlos widerrufen, z. B. über den
        Abmeldelink in jeder E-Mail oder per Kontaktaufnahme an {contact}. Zudem
        steht dir ein Beschwerderecht bei einer Datenschutz-Aufsichtsbehörde zu.
      </p>

      {legal.privacyPolicyUrl && (
        <p style={{ ...textStyle, marginTop: 24 }}>
          Die vollständige Datenschutzerklärung von {tenant.name} findest du hier:{" "}
          <a href={legal.privacyPolicyUrl} target="_blank" rel="noreferrer">
            {legal.privacyPolicyUrl}
          </a>
        </p>
      )}

      <Link to={`/w/${slug}`} className="restart-link" style={{ display: "inline-block", marginTop: 32 }}>
        ← Zurück zum Weinfinder
      </Link>
    </div>
  );
}
