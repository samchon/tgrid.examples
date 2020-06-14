import { Vector } from "tstl/container";
import { WebServer } from "tgrid/protocols/web";

async function main(): Promise<void>
{
    let server = new WebServer<{}, Vector<number>>();
    await server.open(10100, async acceptor =>
    {
        await acceptor.accept(new Vector<number>());
    });
}
main();