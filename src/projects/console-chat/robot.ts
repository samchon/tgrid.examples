import * as std from "tstl";

import { WebConnector } from "tgrid/protocols/web";
import { Driver } from "tgrid/components";

import { IChatService } from "../../controllers/IChatService";
import { IChatPrinter } from "../../controllers/IChatPrinter";

class ChatPrinter implements IChatPrinter
{
    public talk({}: string, {}: string): void
    {
        // NOTHING TO DO
    }
}

async function main(name: string, ...messages: string[]): Promise<void>
{
    //----
    // PREPARATIONS
    //----
    // CONNECT WITH LISTENER
    let connector: WebConnector = new WebConnector(new ChatPrinter());
    await connector.connect("ws://127.0.0.1:10103");

    let service: Driver<IChatService> = connector.getDriver<IChatService>();

    //----
    // DO CHAT
    //----
    // SET MY NAME
    while (true)
    {
        if (await service.setName(name) === true)
            break;
        name += String.fromCharCode(std.randint("a".charCodeAt(0), "Z".charCodeAt(0)));
    }
    
    // TALK MESSAGES
    for (let msg of messages)
    {
        await std.sleep_for(std.randint(50, 500));
        await service.talk(msg);
    }

    // QUIT
    await connector.close();
}
main(process.argv[2], ...process.argv.slice(3));