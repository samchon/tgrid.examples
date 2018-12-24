import { WebConnector } from "tgrid/protocols/web";
import { Driver } from "tgrid/basic";
import { ICalculator } from "../utils/ICalculator";

async function main(): Promise<void>
{
	//----
	// PREPARES
	//----
	// DO CONNECT
	let connector: WebConnector = new WebConnector();
	await connector.connect("ws://127.0.0.1:10102");

	// GET DRIVER
	let calc: Driver<ICalculator> = connector.getDriver<ICalculator>();
	
	//----
	// CALL FUNCTIONS
	//----
	// FUNCTIONS IN THE ROOT SCOPE
	console.log("1 + 6 =", await calc.plus(1, 6));
	console.log("7 * 2 =", await calc.multiplies(7, 2));

	// FUNCTIONS IN AN OBJECT (SCIENTIFIC)
	console.log("3 ^ 4 =", await calc.scientific.pow(3, 4));
	console.log("log (2, 32) =", await calc.scientific.log(2, 32));

	try
	{
		// TO CATCH EXCEPTION IS STILL POSSIBLE
		await calc.scientific.sqrt(-4);
	}
	catch (err)
	{
		console.log("SQRT (-4) -> Error:", err.message);
	}

	// FUNCTIONS IN AN OBJECT (STATISTICS)
	console.log("Mean (1, 2, 3, 4) =", await calc.statistics.mean(1, 2, 3, 4));
	console.log("Stdev. (1, 2, 3, 4) =", await calc.statistics.stdev(1, 2, 3, 4));

	//----
	// TERMINATE
	//----
	await connector.close();
}
main();