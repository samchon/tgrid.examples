import { Vector } from "tstl/container";
import { WebServer, WebAcceptor } from "tgrid/protocols/web";

async function main(): Promise<void>
{
    let server = new WebServer();
    await server.open(10100, async (acceptor: WebAcceptor) =>
    {
        await acceptor.accept(new Vector<number>());
    });
}
main();