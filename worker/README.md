
## Workers

Each worker should have a unique name. In principle each worker has its own
Dockerfile because the dependencies vary depending on the type of work it is
meant to perform.

Each Dockerfile must satisfy the following:

- Export an environment variable `WORKER_QUEUE` that contains the name of the
  message queue that the worker will listen to.
- Modify its PATH variable so that a `work` executable is available. This
  executable will be called when the worker receives a task and the payload will
  be passed as an argument to the command.

Each worker will be started by running `pnpm run worker`. This process connects
to a message queue. Each time it consumes a message, it will run the `work`
command, passing the message payload as an argument.

## Worker server

The worker server is started by running `pnpm run server`. This server receives
HTTP requests and based on those pushes a message to the appropriate message
queue. The server is hosted as `worker.veracioux.me`. The worker server
Dockerfile is responsible for running RabbitMQ.

---

I currently have workers that:

- generate dotfiles from org-mode format to actual configuration files and
  upload them as artifacts to my dropbox.

There's more to come...

