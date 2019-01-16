import { WebServer, WebAcceptor } from "tgrid/protocols/web";
import { CompositeCalculator } from "../../providers/Calculator";

async function main(): Promise<void>
{
    let server: WebServer = new WebServer();
    await server.open(10102, async (acceptor: WebAcceptor) =>
    {
        await acceptor.accept(new CompositeCalculator());
    });
}
main();