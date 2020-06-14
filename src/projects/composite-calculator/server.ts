import { WebServer } from "tgrid/protocols/web";
import { CompositeCalculator } from "../../providers/Calculator";

async function main(): Promise<void>
{
    let server: WebServer<{}, CompositeCalculator> = new WebServer();
    await server.open(10102, async acceptor =>
    {
        await acceptor.accept(new CompositeCalculator());
    });
}
main();