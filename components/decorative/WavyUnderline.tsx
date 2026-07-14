export default function WavyUnderline({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <svg
        aria-hidden
        className="absolute left-0 w-full"
        style={{ bottom: "-4px", height: "5px" }}
        viewBox="0 0 100 5"
        preserveAspectRatio="none"
      >
        <path
          d="M0,2.5 Q10,0.5 20,2.5 T40,2.5 T60,2.5 T80,2.5 T100,2.5"
          stroke="#B33A2C"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
