import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getConfig, submitQuiz } from "./api/client.js";
import { applyBranding } from "./branding.js";
import StartScreen from "./components/StartScreen.jsx";
import QuizQuestion from "./components/QuizQuestion.jsx";
import ResultPage from "./components/ResultPage.jsx";

const STEP_START = "start";
const STEP_QUIZ = "quiz";
const STEP_RESULT = "result";
const STEP_LOADING = "loading";
const STEP_ERROR = "error";

export default function TenantApp() {
  const { slug } = useParams();
  const [tenant, setTenant] = useState(null);
  const [step, setStep] = useState(STEP_LOADING);
  const [error, setError] = useState(null);

  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [selectedSources, setSelectedSources] = useState([]);

  useEffect(() => {
    getConfig(slug)
      .then((data) => {
        setTenant(data);
        applyBranding(data.branding);
        if (data.demo_options?.length > 0) {
          setSelectedSources(data.demo_options.map((o) => o.slug));
        }
        setStep(STEP_START);
      })
      .catch((err) => {
        setError(err.message);
        setStep(STEP_ERROR);
      });
  }, [slug]);

  function handleToggleSource(sourceSlug) {
    setSelectedSources((prev) =>
      prev.includes(sourceSlug)
        ? prev.filter((s) => s !== sourceSlug)
        : [...prev, sourceSlug]
    );
  }


  function handleStart() {
    setQuestionIndex(0);
    setAnswers({});
    setStep(STEP_QUIZ);
  }

  function handleAnswer(field, value) {
    const nextAnswers = { ...answers, [field]: value };
    setAnswers(nextAnswers);

    const quizConfig = tenant.quiz_config || [];
    const isLast = questionIndex === quizConfig.length - 1;

    if (isLast) {
      setStep(STEP_LOADING);
      const payload = selectedSources.length > 0
        ? { ...nextAnswers, sourceSlugs: selectedSources }
        : nextAnswers;
      submitQuiz(slug, payload)
        .then((data) => {
          setResult(data);
          setStep(STEP_RESULT);
        })
        .catch((err) => {
          setError(err.message);
          setStep(STEP_ERROR);
        });
    } else {
      setQuestionIndex(questionIndex + 1);
    }
  }

  function handleRestart() {
    setStep(STEP_START);
  }

  if (step === STEP_LOADING) {
    return (
      <div className="screen">
        <p>Lädt...</p>
      </div>
    );
  }

  if (step === STEP_ERROR) {
    return (
      <div className="screen">
        <div className="error-box">{error || "Es ist ein Fehler aufgetreten."}</div>
      </div>
    );
  }

  if (step === STEP_START) {
    return (
      <StartScreen
        tenant={tenant}
        onStart={handleStart}
        selectedSources={selectedSources}
        onToggleSource={handleToggleSource}
      />
    );
  }

  if (step === STEP_QUIZ) {
    const quizConfig = tenant.quiz_config || [];
    const question = quizConfig[questionIndex];
    if (!question) {
      return (
        <div className="screen">
          <div className="error-box">
            Für diesen Shop ist aktuell kein Quiz konfiguriert.
          </div>
        </div>
      );
    }
    return (
      <QuizQuestion
        question={question}
        index={questionIndex}
        total={quizConfig.length}
        onAnswer={handleAnswer}
      />
    );
  }

  if (step === STEP_RESULT) {
    return (
      <ResultPage
        result={result}
        answers={answers}
        quizConfig={tenant.quiz_config}
        tenant={tenant}
        onRestart={handleRestart}
      />
    );
  }

  return null;
}
