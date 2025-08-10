"use client";
import { useRef } from "react";

type ScrollableDiv = HTMLDivElement & {
  _timeout?: ReturnType<typeof setTimeout>;
};

const ScrollableBox = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<ScrollableDiv | null>(null);

  const handleMouseEnter = () => {
    if (!ref.current) return;
    ref.current.classList.add("show-scrollbar");
    if (ref.current._timeout) clearTimeout(ref.current._timeout);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current._timeout = setTimeout(() => {
      ref.current?.classList.remove("show-scrollbar");
    }, 1000);
  };

  return (
    <div
      ref={ref}
      className="relative w-full h-screen overflow-y-auto custom-scrollbar "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="h-full " style={{direction:"rtl"}}>{children}</div>
    </div>
  );
};

export default ScrollableBox;
