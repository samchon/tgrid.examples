import { WorkerConnector } from "tgrid/protocols/workers";
import { Driver } from "tgrid/basic";

import { ICalculator } from "../utils/ICalculator";
import { Bundler } from "../utils/Bundler";
import * as fs from "fs";

const ORIGIN = __dirname + "/child.js";
const BUNDLE = __dirname + "/child.bundle.js";

async function main(): Promise<void>
{
    //----
    // COMPILIATION
    //----
    // BUNDLE child.js -> child.bundle.js
    await Bundler.bundle(ORIGIN, BUNDLE);

    // READ THE SOURCE CODE
    let content: string = fs.readFileSync(BUNDLE, "utf8");
    
    // OPEN WORKER WITH COMPILATION
    let connector: WorkerConnector = new WorkerConnector();
    await connector.compile(content);

    //----
    // CALL REMOTE FUNCTIONS
    //----
    // GET DRIVER
    let calc: Driver<ICalculator> = connector.getDriver<ICalculator>();

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