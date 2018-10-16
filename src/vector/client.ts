import { Vector } from "tstl/container";
import { WebConnector } from "tgrid/protocol/web";

type IVector<T> = Pick<Vector<T>, "size" | "at" | "push_back">;

async function main(): Promise<void>
{
    let connector = new WebConnector();
    await connector.connect("ws://127.0.0.1:10100");

    let vec = connector.getDriver<IVector<number>>();
    for (let i: number = 0; i < 5; ++i)
	    await vec.push_back(i);

    console.log("size:", await vec.size());
    for (let i: number = 0; i < await vec.size(); ++i)
        console.log("  element:", await vec.at(i));
}
main();