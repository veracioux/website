import PromptArea from "@/components/PromptArea";
import { Fab } from "@mui/material";

export default function Page() {
  return (
    <div className="h-screen w-screen">
      <div className="h-full p-12 flex flex-col items-center justify-between">
        <main className="flex flex-col items-center p-8 sm:p-16 md:p-32">
          <div className="font-bold flex flex-col gap-4 text-center text-2xl">
            <h1 className="text-4xl mb-8">
              Welcome to <span>AI&nbsp;Chat</span>
            </h1>
            <div>
              <Fab sx={{ textTransform: "none" }} variant="extended">
                Send me a message
              </Fab>
            </div>
            or
            <div>
              <Fab
                sx={{ textTransform: "none" }}
                variant="extended"
                color="secondary"
              >
                Chat with my AI assistant
              </Fab>
            </div>
          </div>
        </main>
        <PromptArea className="w-full max-w-[60vw]" />
      </div>
    </div>
  );
}
