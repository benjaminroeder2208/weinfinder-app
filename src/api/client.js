const BASE_URL = "/api";

async function handle(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Fehler ${res.status}`);
  }
  return res.json();
}

export function getConfig(slug) {
  return fetch(`${BASE_URL}/tenants/${slug}/config`).then(handle);
}

export function getWines(slug) {
  return fetch(`${BASE_URL}/tenants/${slug}/wines`).then(handle);
}

export function submitQuiz(slug, answers) {
  return fetch(`${BASE_URL}/tenants/${slug}/quiz-result`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(answers),
  }).then(handle);
}
