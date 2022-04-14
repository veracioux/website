import * as http from "http";
import * as amqp from "amqplib";
import {createMQChannel} from "./common";

let ch: amqp.Channel;

async function main() {
    ch = await createMQChannel();
    http.createServer(async (req, res) => {
        const url = new URL(req.url, `http://${req.headers.host}`);
        try {
            if (url.pathname == "/dotfiles") {
                await ch.assertQueue("dotfiles");
                ch.sendToQueue("dotfiles", Buffer.from(JSON.stringify(
                    [req.method, url.searchParams.get("ref") || "master"])), /*{
                    replyTo: "amq.rabbitmq.reply-to"
                }*/);
                res.statusCode = 200;
            } else {
                res.statusCode = 404;
            }
            res.end();
        } catch (err) {
            res.statusCode = 500;
            res.end(err);
        }
    }).listen(parseInt(process.env.WORKER_SERVER_PORT), () => {
        console.log(`Worker server started on port ${process.env.WORKER_SERVER_PORT}.`);
    });
}

main().catch(console.error);
