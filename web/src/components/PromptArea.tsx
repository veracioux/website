"use client";

import { TextField, Fab, Grow } from "@mui/material";
import Chip from "@mui/material/Chip";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import clsx from "clsx";
import { useRef, useState, type KeyboardEventHandler } from "react";
import React from "react";

const PROMPT_SUGGESTIONS = [
  "Hi Haris, I'm a recruiter. Please send me a customized resume.",
  "Hi Haris, I'd like to collaborate on a project about...",
];

function PromptArea(props: { className?: string }) {
  const [promptValue, setPromptValue] = useState("");
  const textFieldRef = useRef<HTMLDivElement>(null);
  const [suggestionsTranslation, setSuggestionsTranslation] = useState({
    x: 0,
    y: 0,
  });

  const onSubmit = (value: string) => {
    setPromptValue("");
  };

  const onKeyDown: KeyboardEventHandler = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.stopPropagation();
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(promptValue);
    }
  };

  const onPromptFocusChange: React.FocusEventHandler<HTMLElement> = (e) => {
    setSuggestionsTranslation({
      x: e.target.matches(":focus-within")
        ? (-e.target.clientWidth * 0.15) / 2
        : 0,
      y: 0,
    });
  };

  const focusTextField = () => {
    textFieldRef.current!.querySelector("textarea")!.focus();
  };

  return (
    <div
      className={clsx(
        "delay-300 z-10",
        "**:transition-all **:duration-300",
        props.className
      )}
    >
      <div
        className={clsx("flex flex-col items-start gap-2 mb-2", "suggestions")}
        style={{
          transform: `translate(${suggestionsTranslation.x}px, ${suggestionsTranslation.y}px)`,
        }}
      >
        {PROMPT_SUGGESTIONS.map((suggestion, index) => (
          <Grow in={!promptValue} timeout={300} key={index}>
            <Chip
              className="origin-left"
              tabIndex={-1}
              onFocus={focusTextField}
              variant="outlined"
              {...{ onClick() {} }}
              label={suggestion}
            />
          </Grow>
        ))}
      </div>
      <TextField
        ref={textFieldRef}
        className={clsx(
          "textfield",
          "w-full [&_textarea]:pr-10!",
          "transition-all duration-300 origin-top",
          "focus-within:shadow-lg focus-within:scale-[115%]"
        )}
        placeholder="adsfasdf"
        multiline
        onKeyDown={onKeyDown}
        onFocus={onPromptFocusChange}
        onBlur={onPromptFocusChange}
        onChange={(e) => setPromptValue(e.target.value)}
        value={promptValue}
        maxRows={10}
        sx={{
          "& textarea": {
            transition: "height 0.2s ease-in-out, width 0.2s ease-in-out",
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <div
                className={clsx(
                  "absolute right-2 bottom-2 flex flex-col justify-end h-full"
                )}
              >
                <Fab
                  onClick={() => onSubmit(promptValue)}
                  onFocus={focusTextField}
                  disabled={!promptValue.trim()}
                  color="primary"
                  aria-label="Submit"
                  size="small"
                >
                  <ArrowUpwardIcon />
                </Fab>
              </div>
            ),
          },
        }}
      ></TextField>
    </div>
  );
}

export default PromptArea;
