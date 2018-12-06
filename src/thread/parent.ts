import { WorkerConnector } from "tgrid/protocols/workers";

import { Vector } from "tstl/container";
import { Mutex } from "tstl/thread";

// FEATURES TO PROVIDE
namespace provider
{
    export var mutex = new Mutex();
    export function print(str: string): void
    {
        process.stdout.write(str);
    }
}

async function main(): Promise<void>
{
    let workers: Vector<WorkerConnector<typeof provider>> = new Vector();

    // CREATE WORKERS
    for (let i: number = 0; i < 4; ++i)
    {
        workers.push_back(new WorkerConnector(provider));
        workers.back().connect(__dirname + "/child.js");
    }

    // WAIT THEM TO BE CLOSED
    for (let w of workers)
        await w.join();
}
main();