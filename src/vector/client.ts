import { Vector } from "tstl/container";
import { WebConnector } from "tgrid/protocols/web";
import { Driver } from "tgrid/basic";

type IVector<T> = Pick<Vector<T>, "size" | "at" | "push_back">;

async function main(): Promise<void>
{
    let connector: WebConnector = new WebConnector();
    await connector.connect("ws://127.0.0.1:10100");

    let vec: Driver<IVector<number>> = connector.getDriver<IVector<number>>();
    for (let i: number = 0; i < 5; ++i)
	    await vec.push_back(i);

    console.log("size:", await vec.size());
    for (let i: number = 0; i < await vec.size(); ++i)
        console.log("  element:", await vec.at(i));
}
main();