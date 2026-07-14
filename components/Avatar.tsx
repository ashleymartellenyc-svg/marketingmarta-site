export default function Avatar({ initials }: { initials: string }) {
  return (
    <div
      className="w-14 h-14 rounded-full flex items-center justify-center shrink-0"
      style={{ background: "#FAF6F0", border: "1px solid #8B6F47" }}
    >
      <span className="font-serif text-base text-cherry uppercase select-none">
        {initials}
      </span>
    </div>
  );
}
