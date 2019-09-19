import { SimpleCalculator } from "../../providers/Calculator";

function main(): void
{
    //----
    // CALL FUNCTIONS
    //----
    // CONSTRUCT CALCULATOR
    let calc: SimpleCalculator = new SimpleCalculator();

    // CALL FUNCTIONS DIRECTLY
    console.log("1 + 3 =", calc.plus(1, 3));
    console.log("7 - 4 =", calc.minus(7, 4));
    console.log("8 x 9 =", calc.multiplies(8, 9));

    // TO CATCH EXCEPTION
    try 
    {
        calc.divides(4, 0);
    }
    catch (err)
    {
        console.log("4 / 0 -> Error:", err.message);
    }
}
main();
