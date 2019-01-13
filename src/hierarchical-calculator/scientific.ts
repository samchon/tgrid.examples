import { WorkerServer } from "tgrid/protocols/workers";
import { Scientific } from "../utils/Calculator";

async function main(): Promise<void>
{
    let server = new WorkerServer();
    await server.open(new Scientific());
}
main();