import { WebServer } from "tgrid/protocols/web";
import { SimpleCalculator } from "../../providers/Calculator";

async function main(): Promise<void>
{
    let server: WebServer<{}, SimpleCalculator> = new WebServer();
    await server.open(10101, async acceptor =>
    {
        await acceptor.accept(new SimpleCalculator());
    });
}
main();