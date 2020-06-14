import { WorkerConnector } from "tgrid/protocols/workers";

import { ChatService } from "../../providers/ChatService";
import { IChatPrinter } from "../../controllers/IChatPrinter";
import { IChatHeaders } from "../../headers/IChatHeaders";

import { SCRIPTS } from "../../utils/Script";

async function fork(name: string, ...messages: string[]): Promise<WorkerConnector<{}, ChatService>>
{
    let service: ChatService = new ChatService();
    let connector: WorkerConnector<IChatHeaders, ChatService> = new WorkerConnector(service);

    service.assign(connector.getDriver<IChatPrinter>());
    await connector.connect(__dirname + "/child.js", { 
        name: name,
        messages: messages
    });
    return connector;
}

async function main(): Promise<void>
{
    let connectors: WorkerConnector<IChatHeaders, ChatService>[] = [];
    for (let script of SCRIPTS)
    {
        let c = await fork( script[0], ...script.slice(1) );
        connectors.push(c);
    }
}
main();