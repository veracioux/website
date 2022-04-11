import * as amqp from "amqplib";
import {execFileSync} from "child_process";

const host = process.env.RABBITMQ_HOST;
const user = process.env.RABBITMQ_DEFAULT_USER;
const pass = process.env.RABBITMQ_DEFAULT_PASS;

export async function createMQChannel(): Promise<amqp.Channel> {
    execFileSync("scripts/wait-for-it.sh", ["-h", host, "-p", "5672"], {
        stdio: ["inherit", "inherit", "inherit"],
    });
    let url = `amqp://${user}:${pass}@${host}`;
    const connection = await amqp.connect(url).catch(err => {
        console.error(err);
        throw err;
    });
    console.log(`Connected to broker at ${url}.`);
    return await connection.createChannel()
}
