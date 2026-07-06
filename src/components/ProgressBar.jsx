export default function ProgressBar({ current, total, prefix, suffix }) {
  const percent = (current / total) * 100;
  return (
    <>
      <div className="progress-label">
        {prefix} {current} {suffix} {total}
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
    </>
  );
}
