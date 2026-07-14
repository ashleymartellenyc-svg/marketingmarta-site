export default function RotatingAsterisk({ size = "text-xl" }: { size?: string }) {
  return (
    <span
      className={`inline-block text-cherry spin-slow select-none ${size}`}
      aria-hidden
    >
      ✶
    </span>
  );
}
