import { WorkerServer, WorkerConnector } from "tgrid/protocols/workers";
import { Driver } from "tgrid/components";

import { SimpleCalculator } from "../../providers/Calculator";
import { IScientific, IStatistics } from "../../controllers/ICalculator";

class HierarchicalCalculator extends SimpleCalculator
{
    // REMOTE CALCULATOR
    public scientific!: Driver<IScientific>;
    public statistics!: Driver<IStatistics>;
}

async function get<Controller extends object>
    (path: string): Promise<Driver<Controller>>
{
    // DO CONNECT
    let connector: WorkerConnector<{}, null> = new WorkerConnector(null);
    await connector.connect(__dirname + "/" + path, {});

    // RETURN DRIVER
    return connector.getDriver<Controller>();
}

async function main(): Promise<void>
{
    // PREPARE REMOTE CALCULATOR
    let calc = new HierarchicalCalculator();
    calc.scientific = await get<IScientific>("scientific.js");
    calc.statistics = await get<IStatistics>("statistics.js");

    // OPEN SERVER
    let server: WorkerServer<{}, HierarchicalCalculator> = new WorkerServer();
    await server.open(calc);
}
main();