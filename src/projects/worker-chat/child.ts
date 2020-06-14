import { WorkerServer } from "tgrid/protocols/workers";
import { Driver } from "tgrid/components";

import { IChatService } from "../../controllers/IChatService";
import { IChatPrinter } from "../../controllers/IChatPrinter";

import { sleep_for } from "tstl/thread";
import { randint } from "tstl/algorithm";
import { IChatHeaders } from "../../headers/IChatHeaders";

class ChatPrinter implements IChatPrinter
{
    public talk({}: string, {}: string): void
    {
        // NOTHING TO DO
    }
}

async function main(): Promise<void>
{
    //----
    // PREPARATIONS
    //----
    // CONNECT WITH LISTENER
    let server: WorkerServer<IChatHeaders, ChatPrinter> = new WorkerServer();
    await server.open(new ChatPrinter());

    let service: Driver<IChatService> = server.getDriver<IChatService>();

    //----
    // DO CHAT
    //----
    // SET MY NAME
    let name: string = server.headers.name;
    while (true)
    {
        if (await service.setName(name) === true)
            break;
        name += String.fromCharCode(randint("a".charCodeAt(0), "Z".charCodeAt(0)));
    }
    
    // TALK MESSAGES
    for (let msg of server.headers.messages)
    {
        await sleep_for(randint(50, 500));
        await service.talk(msg);
    }

    // QUIT
    await server.close();
}
main();