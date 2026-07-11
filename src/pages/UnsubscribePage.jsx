import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { unsubscribeLead } from "../api/client.js";

export default function UnsubscribePage() {
  const { token } = useParams();
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  useEffect(() => {
    unsubscribeLead(token)
      .then(() => setStatus("done"))
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, [token]);

  return (
    <div className="screen" style={{ textAlign: "center", paddingTop: 96 }}>
      {status === "loading" && <p>Meldet dich ab...</p>}
      {status === "done" && (
        <>
          <h1>Abgemeldet</h1>
          <p>Du erhältst keine weiteren E-Mails zu dieser Anfrage mehr.</p>
        </>
      )}
      {status === "error" && (
        <div className="error-box" style={{ display: "inline-block" }}>
          {error || "Dieser Link ist ungültig."}
        </div>
      )}
    </div>
  );
}
