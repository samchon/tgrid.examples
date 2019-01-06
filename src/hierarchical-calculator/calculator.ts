import { WorkerServer, WorkerConnector } from "tgrid/protocols/workers";
import { Driver } from "tgrid/basic";

import { IScientific, IStatistics } from "../utils/ICalculator";

class HierarchicalCalculator
{
	// REMOTE CALCULATOR
	public scientific: Driver<IScientific>;
	public statistics: Driver<IStatistics>;

	// BY ITSELF
	public plus(x: number, y: number): number
	{
		return x + y;
	}
	public minus(x: number, y: number): number
	{
		return x - y;
	}
	public multiplies(x: number, y: number): number
	{
		return x * y;
	}
	public divides(x: number, y: number): number
	{
		if (y === 0)
			throw new Error("Divided by zero.");
		return x / y;
	}
}

async function get_calculator<Controller extends object>
	(path: string): Promise<Driver<Controller>>
{
	// DO CONNECT
	let connector = new WorkerConnector();
	await connector.connect(path);
	
	console.log(path, "connected");

	// RETURN DRIVER
	return connector.getDriver<Controller>();
}

async function main(): Promise<void>
{
	// PREPARE REMOTE CALCULATOR
	let calculator = new HierarchicalCalculator();
	calculator.scientific = await get_calculator<IScientific>(__dirname + "/scientific.js");
	calculator.statistics = await get_calculator<IStatistics>(__dirname + "/statistics.js");

	// OPEN SERVER
	let server = new WorkerServer();
	await server.open(calculator);

	console.log("server has opened");
}
main();