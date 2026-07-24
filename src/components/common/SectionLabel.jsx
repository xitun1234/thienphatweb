export default function SectionLabel({ text }) {
  return (
    <div className="flex items-center gap-[8px] mb-[12px]">
      <span
        className="inline-block w-[5px] h-[5px] flex-shrink-0"
        style={{ backgroundColor: "#322d2a" }}
      />
      <span
        className="text-[11px] tracking-[0.12em] uppercase font-normal"
        style={{ color: "#8b8b8b" }}
      >
        {text}
      </span>
    </div>
  );
}
