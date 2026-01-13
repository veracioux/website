"use client";
import { Fab } from "@mui/material";
import clsx from "clsx";
import { useState, useRef, useMemo, useCallback } from "react";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";

/**
 * Minimum mouse drag distance from the top-left corner that causes the
 * overlay to fully expand.
 */
const THRESHOLD_X = 250;

function ButtonIcon(
  props: React.ComponentProps<typeof HomeIcon> & { activeApp: "chat" | "main" }
) {
  const { activeApp, ...rest } = props;
  if (activeApp === "chat") {
    return <HomeIcon {...rest} />;
  } else {
    return <ChatIcon {...rest} />;
  }
}

/**
 * Widget for switching between Chat and the main frontend app.
 */
function AppSwitcher(props: { className?: string }) {
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const [clickOrigin, setClickOrigin] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [delta, setDelta] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [activeApp, setActiveApp] = useState<"chat" | "main">("chat");

  const clipPath = useMemo(() => {
    if (!dragHandleRef.current) return "polygon(0% 0%, 0% 0%, 0% 0%)";

    const handleCenterPos = {
      x:
        dragHandleRef.current.offsetLeft +
        dragHandleRef.current.offsetWidth / 2 +
        delta.x,
      y:
        dragHandleRef.current.offsetTop +
        dragHandleRef.current.offsetHeight / 2 +
        delta.y,
    };
    const percentY = (handleCenterPos.y / window.innerHeight) * 2 * 100;
    const percentX = (handleCenterPos.x / window.innerWidth) * 2 * 100;
    // A, B, C corresponds to this triangle:
    // A---C
    // |  /
    // | /
    // B
    return `polygon(0% 0%, 0% ${percentY}%, ${percentX}% 0%)`;
  }, [delta]);
  const crossedThreshold = delta.x > THRESHOLD_X;

  const onMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setClickOrigin({ x: e.clientX, y: e.clientY });
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!clickOrigin) return;

    if (crossedThreshold) {
      setIsDragging(false);
      setDelta({
        x: window.innerWidth - clickOrigin.x,
        y: window.innerHeight - clickOrigin.y,
      });
      setActiveApp("main");
      return;
    }

    const deltaX = e.clientX - clickOrigin.x;
    const deltaY = e.clientY - clickOrigin.y;
    // TODO: Debounce
    setDelta({ x: deltaX, y: deltaY });
  };

  const onMouseUp = () => {
    if (crossedThreshold) return;

    setClickOrigin(null);
    setDelta({ x: 0, y: 0 });
    setIsDragging(false);
  };

  return (
    <div
      className={clsx(
        "fixed inset-0",
        crossedThreshold ? "z-2000" : "",
        props.className
      )}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      <div
        className="absolute inset-0 bg-white duration-200"
        style={{
          clipPath,
          transition: isDragging
            ? "none"
            : `clip-path ${crossedThreshold ? 1.0 : 0.15}s ease-out`,
        }}
      >
        {/* TODO: URL */}
        {isDragging || activeApp === "main" ? (
          <iframe src="https://veracioux.me" className="w-full h-full"></iframe>
        ) : null}
      </div>
      <div
        style={{
          transform: crossedThreshold
            ? undefined
            : `translate(${delta.x}px, ${delta.y}px)`,
          top: crossedThreshold ? "auto" : undefined,
          left: crossedThreshold ? "auto" : undefined,
          bottom: crossedThreshold ? "1.25rem" : undefined,
          right: crossedThreshold ? "1.25rem" : undefined,
        }}
        className={clsx(
          "absolute -top-5 -left-5",
          isDragging ? "" : "transition-all!"
        )}
        ref={dragHandleRef}
      >
        <Fab
          className={clsx(
            "transition-all! duration-200",
            "hover:scale-125 select-none",
            isDragging ? "scale-125" : ""
          )}
          size="medium"
          color="secondary"
          onMouseDown={onMouseDown}
        >
          <ButtonIcon
            activeApp={activeApp}
            className={clsx(
              "transition-all! duration-300",
              delta.x > THRESHOLD_X / 8
                ? "opacity-100 scale-100"
                : "scale-0 opacity-0"
            )}
          />
        </Fab>
      </div>
    </div>
  );
}

export default AppSwitcher;
