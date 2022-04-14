import * as amqp from "amqplib";
import {execFileSync} from "child_process";

export async function createMQChannel(): Promise<amqp.Channel> {
    const host = process.env.RABBITMQ_HOST;
    const port = process.env.RABBITMQ_PORT;
    const user = process.env.RABBITMQ_USER;
    const pass = process.env.RABBITMQ_PASS;

    if (host && port) {
        execFileSync("scripts/wait-for-it.sh", ["-h", host, "-p", port], {
            stdio: ["inherit", "inherit", "inherit"],
        });
    }

    let url = `amqp://${user}:${pass}@${host}`;
    const connection = await amqp.connect(url).catch(err => {
        console.error(err);
        throw err;
    });
    console.log(`Connected to broker at ${url}.`);
    return await connection.createChannel()
}
