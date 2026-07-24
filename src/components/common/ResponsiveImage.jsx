import { useState } from "react";

export default function ResponsiveImage({
  src,
  alt,
  className = "",
  aspectRatio,
  loading = "lazy",
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const style = {};
  if (aspectRatio) {
    style.aspectRatio = aspectRatio;
  }

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-[#e8e7e2] ${className}`}
        style={style}
      >
        <span className="text-[#8b8b8b] text-[13px]">{alt || "Ảnh"}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {!loaded && (
        <div className="absolute inset-0 bg-[#e8e7e2] animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={`w-full h-full object-contain transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
