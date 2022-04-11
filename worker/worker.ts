import {createMQChannel} from "./common";
import {execFile} from "child_process";

const queue = process.env.WORKER_QUEUE;

async function consumer() {
    const ch = await createMQChannel();
    await ch.assertQueue(queue);
    while (true) {
        await ch.consume(queue, async msg => {
            console.log("Received task with payload:");
            console.log(msg.content.toString());
            await new Promise<void>((resolve, reject) => {
                let process = execFile("work", [msg.content.toString()]);
                process.stdout.on("data", chunk => {console.log(chunk.slice(0, -1));})
                process.stderr.on("data", chunk => {console.error(chunk.slice(0, -1));})
                process.on("error", reject);
                process.on("exit", code => {
                    if (code == 0)
                        resolve();
                    else
                        reject();
                });
            }).catch(err => {throw err});
            ch.ack(msg);
        }).catch(console.warn);
    }
}

consumer().catch(console.error);
