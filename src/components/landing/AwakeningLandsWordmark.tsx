export function AwakeningLandsWordmark(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 32"
      fill="none"
      aria-hidden
      className={props.className}
    >
      <text
        x="0"
        y="14"
        fill="var(--al-ink, rgba(15, 23, 42, 0.9))"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="10"
        fontWeight="500"
        letterSpacing="0.2em"
      >
        AWAKENING
      </text>
      <text
        x="0"
        y="28"
        fill="var(--al-gold, var(--halo-yellow, #F6C44F))"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="14"
        fontWeight="700"
        letterSpacing="0.05em"
      >
        LANDS
      </text>
    </svg>
  );
}
