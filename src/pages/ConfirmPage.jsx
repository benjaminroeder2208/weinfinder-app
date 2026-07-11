import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { confirmLead } from "../api/client.js";

export default function ConfirmPage() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    confirmLead(token)
      .then(() => setStatus("done"))
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, [token]);

  return (
    <div className="screen" style={{ textAlign: "center", paddingTop: 96 }}>
      {status === "loading" && <p>Bestätige deine E-Mail-Adresse...</p>}
      {status === "done" && (
        <>
          <h1>Bestätigt!</h1>
          <p>
            Deine E-Mail-Adresse ist bestätigt. Du bekommst deine Weinempfehlung
            in Kürze in einer separaten E-Mail zugeschickt.
          </p>
        </>
      )}
      {status === "error" && (
        <div className="error-box" style={{ display: "inline-block" }}>
          {error || "Dieser Bestätigungslink ist ungültig oder abgelaufen."}
        </div>
      )}
    </div>
  );
}
