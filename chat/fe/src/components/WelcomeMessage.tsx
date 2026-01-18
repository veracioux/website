import { Fab } from "@mui/material";

function WelcomeMessage() {
  return (
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
  );
}

export default WelcomeMessage;
