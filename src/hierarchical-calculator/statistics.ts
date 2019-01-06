import { WorkerServer } from "tgrid/protocols/workers";
import { Statistics } from "../utils/Calculator";

async function main(): Promise<void>
{
	let server = new WorkerServer();
	await server.open(new Statistics());
}
main();