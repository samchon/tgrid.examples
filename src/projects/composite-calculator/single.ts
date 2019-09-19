import { CompositeCalculator } from "../../providers/Calculator";

function main(): void
{
    //----
    // CALL FUNCTIONS
    //----
    // CONSTRUCT CALCULATOR
    let calc: CompositeCalculator = new CompositeCalculator();

    // FUNCTIONS IN THE ROOT SCOPE
    console.log("1 + 6 =", calc.plus(1, 6));
    console.log("7 * 2 =", calc.multiplies(7, 2));

    // FUNCTIONS IN AN OBJECT (SCIENTIFIC)
    console.log("3 ^ 4 =", calc.scientific.pow(3, 4));
    console.log("log (2, 32) =", calc.scientific.log(2, 32));

    try
    {
        // TO CATCH EXCEPTION
        calc.scientific.sqrt(-4);
    }
    catch (err)
    {
        console.log("SQRT (-4) -> Error:", err.message);
    }

    // FUNCTIONS IN AN OBJECT (STATISTICS)
    console.log("Mean (1, 2, 3, 4) =", calc.statistics.mean(1, 2, 3, 4));
    console.log("Stdev. (1, 2, 3, 4) =", calc.statistics.stdev(1, 2, 3, 4));
}
main();
