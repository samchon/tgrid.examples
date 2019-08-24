import * as cp from "child_process";
import * as std from "tstl";

import { SCRIPTS } from "../../utils/Script";

function robot(name: string, ...messages: string[]): cp.ChildProcess
{
    return cp.fork(__dirname + "/robot.js", [name, ...messages]);
}

async function main(): Promise<void>
{
    let server: cp.ChildProcess = cp.fork(__dirname + "/server.js");
    let clients: cp.ChildProcess[] = [];
    
    // OPEN CLIENTS
    await std.sleep_for(500);
    for (let script of SCRIPTS)
        clients.push( robot(script[0], ...script.slice(1)) );
        
    // WAIT AND CLOSE
    let latch: std.Latch = new std.Latch(clients.length);
    for (let c of clients)
        c.on("close", () => latch.count_down());

    await latch.wait();
    server.kill();
}
main();