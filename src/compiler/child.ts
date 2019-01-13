
import { WorkerServer } from "tgrid/protocols/workers";
import { Calculator } from "../utils/Calculator";

async function main(): Promise<void>
{
    let server: WorkerServer = new WorkerServer();
    await server.open(new Calculator());
}
main();