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

export function confirmLead(token) {
  return fetch(`${BASE_URL}/leads/confirm/${token}`).then(handle);
}

export function unsubscribeLead(token) {
  return fetch(`${BASE_URL}/leads/unsubscribe/${token}`).then(handle);
}

export function submitLead(slug, data) {
  return fetch(`${BASE_URL}/tenants/${slug}/leads`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handle);
}
