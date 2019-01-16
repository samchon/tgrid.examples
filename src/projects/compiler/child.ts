
import { WorkerServer } from "tgrid/protocols/workers";
import { CompositeCalculator } from "../../providers/Calculator";

async function main(): Promise<void>
{
    let server: WorkerServer<CompositeCalculator> = new WorkerServer();
    await server.open(new CompositeCalculator());
}
main();