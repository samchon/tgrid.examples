import { WebConnector } from "tgrid/protocols/web";
import { Driver } from "tgrid/components";
import { ISimpleCalculator } from "../../controllers/ICalculator";

async function main(): Promise<void>
{
    //----
    // CONNECTION
    //----
    let connector: WebConnector<{}, null> = new WebConnector(null);
    await connector.connect("ws://127.0.0.1:10101", {});
    
    //----
    // CALL FUNCTIONS
    //----
    // GET DRIVER
    let calc: Driver<ISimpleCalculator> = connector.getDriver<ISimpleCalculator>();

    // CALL FUNCTIONS WITH AWAIT SYMBOL
    console.log("1 + 3 =", await calc.plus(1, 3));
    console.log("7 - 4 =", await calc.minus(7, 4));
    console.log("8 x 9 =", await calc.multiplies(8, 9));

    // TO CATCH EXCEPTION IS ALSO POSSIBLE
    try 
    {
        await calc.divides(4, 0);
    }
    catch (err)
    {
        console.log("4 / 0 -> Error:", err.message);
    }

    //----
    // TERMINATE
    //----
    await connector.close();
}
main();