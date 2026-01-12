"use client";

import { TextField, Fab } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import clsx from "clsx";
import { useState, type KeyboardEventHandler } from "react";

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
    <div className={clsx("delay-300", props.className)}>
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
