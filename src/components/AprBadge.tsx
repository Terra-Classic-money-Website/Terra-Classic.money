type AprBadgeProps = {
  value: string;
  label?: string;
  state?: "loading" | "ready" | "error";
  className?: string;
};

export function AprBadge({ value, label = "APR", state = "ready", className = "" }: AprBadgeProps) {
  const accessibleState = state === "loading" ? "loading" : state === "error" ? "unavailable" : value;

  return (
    <span className={`apr-badge ${className}`.trim()} data-state={state} aria-label={`${label} ${accessibleState}`}>
      <span className="apr-badge__value">{value}</span>
      <span className="apr-badge__label">{label}</span>
    </span>
  );
}
