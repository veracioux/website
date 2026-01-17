"use client";

import { TextField, Fab, Grow } from "@mui/material";
import Chip from "@mui/material/Chip";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import clsx from "clsx";
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEventHandler,
} from "react";
import React from "react";
import { useMessaging } from "@/hooks/messaging";
import type { ChatMessage } from "@veracioux/chat-lib";

const PROMPT_SUGGESTIONS = [
  "Hi Haris, I'm a recruiter. Would you be interested in a job opportunity?",
  "Hi Haris, I'm a recruiter. Please send me a customized resume.",
  "Hi Haris, I'd like to collaborate on a project about...",
];

const SCALE_WHEN_UNFOCUSED = 0.85;

function PromptArea(props: { className?: string }) {
  const messaging = useMessaging();
  const [promptValue, setPromptValue] = useState("");
  const textFieldRef = useRef<HTMLDivElement>(null);
  const [suggestionsTranslation, setSuggestionsTranslation] = useState({
    x: 0,
    y: 0,
  });
  const [isFocused, setIsFocused] = useState(false);

  const onSubmit = (value: string) => {
    const message: ChatMessage<"create"> = {
      content: value,
      recipient: "haris", // FIXME
    };
    messaging.sendMessage(message);
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

  useLayoutEffect(() => {
    // Translate suggestions left border to make it align with the text field
    setSuggestionsTranslation({
      x: isFocused ? 0 : (textFieldRef.current!.clientWidth * 0.15) / 2,
      y: 0,
    });
  }, [isFocused]);

  const focusTextField = () =>
    textFieldRef.current!.querySelector("textarea")!.focus();

  return (
    <div
      className={clsx(
        "delay-300 z-10",
        "**:transition-all **:duration-300",
        props.className
      )}
    >
      <div
        className={clsx(
          "absolute flex flex-col items-start gap-2 pb-2 -translate-y-full"
        )}
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
              {...{
                onClick(e: React.MouseEvent<HTMLDivElement>) {
                  setPromptValue(suggestion);
                },
              }}
              label={suggestion}
            />
          </Grow>
        ))}
      </div>
      <TextField
        ref={textFieldRef}
        className={clsx(
          "w-full [&_textarea]:pr-10!",
          "transition-all duration-300 origin-top",
          "focus-within:shadow-lg focus-within:scale-[100%]"
        )}
        data-testid="prompt-textfield"
        placeholder="Start typing..."
        multiline
        onKeyDown={onKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={(e) => setPromptValue(e.target.value)}
        value={promptValue}
        maxRows={10}
        sx={{
          "& textarea": {
            transition: "height 0.2s ease-in-out, width 0.2s ease-in-out",
          },
          transform: `scale(${isFocused ? 1 : SCALE_WHEN_UNFOCUSED})`,
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
                  data-testid="prompt-submit-button"
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
