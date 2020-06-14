import { WorkerServer } from "tgrid/protocols/workers";
import { Driver } from "tgrid/components";

import { Mutex, sleep_for } from "tstl/thread";
import { randint } from "tstl/algorithm";

interface IController
{
    mutex: Mutex;
    print(str: string): void;
}

async function main(character: string): Promise<void>
{
    // PREPARE SERVER
    let server: WorkerServer<{}, null> = new WorkerServer();
    await server.open(null);
    
    // REMOTE FUNCTION CALLS
    let driver: Driver<IController> = server.getDriver<IController>();
    await driver.mutex.lock();
    {
        // PRINT LINE WITH CRITICAL SECTION
        for (let i: number = 0; i < 20; ++i)
        {
            await driver.print(character); // PRINT A CHARACTER
            await sleep_for(randint(50, 100)); // RANDOM SLEEP
        }
        await driver.print("\n");
    }
    await driver.mutex.unlock();

    // CLOSE THE SERVER (WORKER)
    await server.close();
}
main(randint(0, 9) + "");