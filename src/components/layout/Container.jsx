export default function Container({ children, className = "" }) {
  return (
    <div
      className={`w-full max-w-[1200px] mx-auto px-[18px] md:px-[32px] lg:px-[40px] ${className}`}
    >
      {children}
    </div>
  );
}
