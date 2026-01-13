"use client";

import { TextField, Fab } from "@mui/material";
import Chip from "@mui/material/Chip";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import clsx from "clsx";
import { useState, type KeyboardEventHandler } from "react";

const PROMPT_SUGGESTIONS = [
  "Hi Haris, I'm a recruiter. Please send me a customized resume.",
  "Hi Haris, I'd like to collaborate on a project about...",
];

function PromptArea(props: { className?: string }) {
  const [promptValue, setPromptValue] = useState("");

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

  return (
    <div className={clsx("delay-300 z-10", props.className)}>
      <div className="flex flex-col items-start gap-2 mb-2">
        {PROMPT_SUGGESTIONS.map((suggestion, index) => (
          <Chip
            key={index}
            variant="outlined"
            {...{ onClick() {} }}
            label={suggestion}
          />
        ))}
      </div>
      <TextField
        className={clsx("w-full [&_textarea]:pr-10!")}
        placeholder="adsfasdf"
        multiline
        onKeyDown={onKeyDown}
        value={promptValue}
        maxRows={10}
        onChange={(e) => setPromptValue(e.target.value)}
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
                  color="primary"
                  aria-label="Submit"
                  size="small"
                  onClick={() => onSubmit(promptValue)}
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
