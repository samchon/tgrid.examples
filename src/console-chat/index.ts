import * as cp from "child_process";
import * as std from "tstl";

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
    clients.push
    (
        robot("Jeongho Nam", "Hello, I'm Jeongho Nam", "I'm author of the TGrid", "Nice to meet you", "Enjoy the TGrid", "https://github.com/samchon/tgrid"),
        robot("Sam", "Hello, My name is Sam", "Nice to meet you everyone.", "I'm going to sleep. Let's see you tomorrow"),
        robot("John", "What is this?", "Are you listening me?", "Who's that talking with me?"),
        robot("Robot", "I'm robot", "This is the console chat application", "Messages are typed automatically", "Those are all macro messages"),
        robot("Mad Scientist", "HAHAHAHAHAHA", "Conquer all over the world!!!!")
        );
        
    // WAIT AND CLOSE
    let latch: std.experimental.Latch = new std.experimental.Latch(clients.length);
    for (let c of clients)
        c.on("close", () => { latch.arrive(); });

    await latch.wait();
    server.kill();
}
main();