import * as cp from "child_process";

function visit(title: string, path: string): Promise<void>
{
    return new Promise(resolve =>
    {
        console.log("--------------------------------------------------");
        console.log("    " + title);
        console.log("--------------------------------------------------");

        let fork: cp.ChildProcess = cp.fork(path);
        fork.on("close", () =>
        {
            console.log("");
            resolve();
        });
    });
}

async function main(): Promise<void>
{
    await visit("std.Vector", __dirname + "/projects/vector");
    await visit("Simple Calculator", __dirname + "/projects/simple-calculator");
    await visit("Composite Calculator", __dirname + "/projects/composite-calculator");
    await visit("Hierarchical Calculator", __dirname + "/projects/hierarchical-calculator");
    await visit("Chat Application: console ver.", __dirname + "/projects/console-chat");
    await visit("Worker Chat", __dirname + "/projects/worker-chat");
}
main();