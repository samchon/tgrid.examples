import { WebConnector } from "tgrid/protocol/web";
import { ICalculator } from "./internal/ICalculator";

async function main(): Promise<void>
{
	//----
	// PREPARES
	//----
	// DO CONNECT
	let connector = new WebConnector();
	await connector.connect("ws://127.0.0.1:10102");

	// GET DRIVER
	let calc = connector.getDriver<ICalculator>();
	
	//----
	// COMPUTATIONS
	//----
	// NORMAL
	console.log("1 + 6 =", await calc.normal.plus(1, 6));
	console.log("7 * 2 =", await calc.normal.multiplies(7, 2));
	console.log("3 ^ 4 =", await calc.scientific.pow(3, 4));

	// SCIENTIFIC
	console.log("log (2, 32) =", await calc.scientific.log(2, 32));
	console.log("SQRT (64) =", await calc.scientific.sqrt(64));

	// STATISTICS
	console.log
	(
		"Mean (1, 2, 3, 4, 5) =",
		await calc.statistics.mean(1, 2, 3, 4, 5)
	);
	console.log
	(
		"Stdev. (1, 2, 3, 4, 5) =", 
		await calc.statistics.stdev(1, 2, 3, 4, 5)
	);

	//----
	// TERMINATE
	//----
	await connector.close();
}
main();