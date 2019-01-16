import { WebServer, WebAcceptor } from "tgrid/protocols/web";
import { Driver } from "tgrid/basic";

import { ChatService } from "../../providers/ChatService";
import { IChatPrinter } from "../../controllers/IChatPrinter";

async function main(): Promise<void>
{
    let server: WebServer<ChatService> = new WebServer();
    await server.open(10103, async (acceptor: WebAcceptor<ChatService>) =>
    {
        // PREPARE DRIVER
        let driver: Driver<IChatPrinter> = acceptor.getDriver<IChatPrinter>();
        let service: ChatService = new ChatService(driver);

        // HANDSHAKE
        await acceptor.accept(service);
        
        // DESTRUCTOR
        await acceptor.join();
        service.destroy();
    });
}
main();