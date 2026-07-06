const BODY_PERCENT = { leicht: 33, mittel: 66, kraeftig: 100 };
const ACIDITY_PERCENT = { niedrig: 33, mittel: 66, hoch: 100 };

export function tasteProfile(wine) {
  const fruit = Math.min(((wine.aroma_notes?.length || 0) / 4) * 100, 100);
  return {
    frucht: Math.round(fruit),
    koerper: BODY_PERCENT[wine.body] || 50,
    frische: ACIDITY_PERCENT[wine.acidity] || 50,
  };
}

function labelFor(quizConfig, field, value) {
  const question = quizConfig?.find((q) => q.field === field);
  const option = question?.options?.find((o) => o.value === value);
  return option?.label || value;
}

export function buildWhyText(wine, answers, quizConfig) {
  const styleLabel = labelFor(quizConfig, "style", answers.style);
  const occasionLabel = labelFor(quizConfig, "occasion", answers.occasion);
  const foodLabel =
    answers.food && answers.food !== "ohne_essen"
      ? labelFor(quizConfig, "food", answers.food)
      : null;

  let text = `Dieser Wein passt besonders gut zu deinem Wunsch nach einem ${styleLabel}, ${occasionLabel}`;
  if (foodLabel) {
    text += `, der Kombination mit ${foodLabel}`;
  }
  text += ".";
  return text;
}
