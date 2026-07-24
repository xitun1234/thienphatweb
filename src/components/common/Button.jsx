export default function Button({
  children,
  href,
  onClick,
  variant = "filled",
  type = "button",
  disabled = false,
  ariaLabel,
  className = "",
}) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-full font-normal text-[14px] leading-none transition-all duration-300 min-h-[44px] min-w-[44px] px-[24px] py-[14px]";

  const filledStyle = {
    backgroundColor: "#322d2a",
    color: "#ffffff",
    border: "1px solid #322d2a",
  };

  const ghostStyle = {
    backgroundColor: "transparent",
    color: "#322d2a",
    border: "1px solid #322d2a",
  };

  const style = variant === "filled" ? filledStyle : ghostStyle;

  const combinedClassName = `${baseClasses} hover:opacity-80 ${className}`;

  if (href) {
    return (
      <a
        href={href}
        className={combinedClassName}
        style={style}
        aria-label={ariaLabel}
        onMouseEnter={(e) => {
          if (variant === "ghost") {
            e.target.style.backgroundColor = "#322d2a";
            e.target.style.color = "#ffffff";
          }
        }}
        onMouseLeave={(e) => {
          if (variant === "ghost") {
            e.target.style.backgroundColor = "transparent";
            e.target.style.color = "#322d2a";
          }
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${combinedClassName} ${disabled ? "opacity-50 pointer-events-none" : ""}`}
      style={style}
      aria-label={ariaLabel}
      onMouseEnter={(e) => {
        if (variant === "ghost") {
          e.target.style.backgroundColor = "#322d2a";
          e.target.style.color = "#ffffff";
        }
      }}
      onMouseLeave={(e) => {
        if (variant === "ghost") {
          e.target.style.backgroundColor = "transparent";
          e.target.style.color = "#322d2a";
        }
      }}
    >
      {children}
    </button>
  );
}
