import { useRef, useState, useEffect } from "react";

export function TruncateWithTooltip({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      setIsTruncated(el.scrollWidth > el.clientWidth);
    }
  }, [text]);

  return (
    <div className="relative group">
      <h3
        ref={ref}
        className={`truncate text-start font-semibold leading-tight ${className}`}
      >
        {text}
      </h3>

      {isTruncated && (
        <div className="absolute z-50 hidden top-[30px] max-w-xs rounded-md bg-background border px-2 py-1 text-sm text-foreground shadow-md group-hover:block">
          {text}
        </div>
      )}
    </div>
  );
}

export function TruncateParagraphWithTooltip({
  text,
}: {
  text: string;
}) {
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [text]);

  return (
    <div className="relative group">
      <p
        ref={ref}
        className="mt-0.5 line-clamp-2 text-sm text-start text-primary"
      >
        {text}
      </p>

      {isTruncated && (
        <div className="absolute z-50 hidden max-w-sm top-[30px] rounded-md bg-background border px-2 py-1 text-sm text-popover-foreground shadow-md group-hover:block">
          {text}
        </div>
      )}
    </div>
  );
}
