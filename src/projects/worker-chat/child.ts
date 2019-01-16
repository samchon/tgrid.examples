import { WorkerServer } from "tgrid/protocols/workers";
import { Driver } from "tgrid/basic";

import { IChatService } from "../../controllers/IChatService";
import { IChatPrinter } from "../../controllers/IChatPrinter";

import { sleep_for } from "tstl/thread";
import { randint } from "tstl/algorithm";

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
    let server: WorkerServer = new WorkerServer();
    await server.open(new ChatPrinter());

    let service: Driver<IChatService> = server.getDriver<IChatService>();

    //----
    // DO CHAT
    //----
    // SET MY NAME
    let name: string = server.arguments[0];
    while (true)
    {
        if (await service.setName(name) === true)
            break;
        name += String.fromCharCode(randint("a".charCodeAt(0), "Z".charCodeAt(0)));
    }
    
    // TALK MESSAGES
    for (let msg of server.arguments.slice(1))
    {
        await sleep_for(randint(50, 500));
        await service.talk(msg);
    }

    // QUIT
    await server.close();
}
main();