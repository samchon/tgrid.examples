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
    await visit("std.Vector", __dirname + "/vector");
    await visit("Simple Calculator", __dirname + "/simple-calculator");
    await visit("Composite Calculator", __dirname + "/composite-calculator");
    await visit("Hierarchical Calculator", __dirname + "/hierarchical-calculator");
    await visit("Chat Application: console ver.", __dirname + "/console-chat");
}
main();