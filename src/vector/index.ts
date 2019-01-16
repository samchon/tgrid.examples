import * as cp from "child_process";
import * as std from "tstl";

async function main(): Promise<void>
{
    let server: cp.ChildProcess = cp.fork(__dirname + "/server.js");
    let client: cp.ChildProcess;

    await std.sleep_for(500);
    
    client = cp.fork(__dirname + "/client.js");
    client.on("close", () =>
    {
        server.kill();
    });
}
main();