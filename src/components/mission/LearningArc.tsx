export function LearningArc() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 360"
      className="w-full h-auto max-w-3xl mx-auto"
      role="img"
      aria-label="Learning arc: Learn and Listen, Reflect and Integrate, Act and Embody"
    >
      <g
        fill="currentColor"
        style={{
          fontFamily: 'ui-serif, Georgia, "Times New Roman", Times, serif',
          fontSize: 36,
          letterSpacing: "0.2px",
          opacity: 0.9,
        }}
      >
        <text x="140" y="188" textAnchor="middle">
          Learn & Listen
        </text>
        <text x="600" y="110" textAnchor="middle">
          Reflect & Integrate
        </text>
        <text x="1060" y="188" textAnchor="middle">
          Act & Embody
        </text>
      </g>
      <path
        d="M 120 260 C 360 110, 840 110, 1080 260"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}
