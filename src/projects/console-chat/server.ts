import { WebServer } from "tgrid/protocols/web";
import { Driver } from "tgrid/components";

import { ChatService } from "../../providers/ChatService";
import { IChatPrinter } from "../../controllers/IChatPrinter";

async function main(): Promise<void>
{
    let server: WebServer<{}, ChatService> = new WebServer();
    await server.open(10103, async acceptor =>
    {
        // PREPARE SERVICE
        let driver: Driver<IChatPrinter> = acceptor.getDriver<IChatPrinter>();
        let service: ChatService = new ChatService();
        service.assign(driver);

        // ROVIDE THE SERVICE
        await acceptor.accept(service);
        
        // DESTRUCTOR
        await acceptor.join();
        service.destroy();
    });
}
main();