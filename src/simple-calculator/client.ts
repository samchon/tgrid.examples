import { WebConnector } from "tgrid/protocol/web";
import { ICalculator } from "./internal/ICalculator";

async function main(): Promise<void>
{
	let connector = new WebConnector();
	await connector.connect("ws://127.0.0.1:10101");

	let calc = connector.getDriver<ICalculator>();
	console.log("1 + 3 =", await calc.plus(1, 3));
	console.log("7 - 4 =", await calc.minus(7, 4));
	console.log("8 x 9 =", await calc.plus(8, 9));

	try
	{
		await calc.divides(4, 0);
	}
	catch (err)
	{
		console.log("4 / 0 =", err.message);
	}
	await connector.close();
}
main();