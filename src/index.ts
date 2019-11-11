import cp = require("child_process");
import fs = require("fs");

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
    const PATH = __dirname + "/projects"

    let directory: string[] = fs.readdirSync(PATH);
    for (let elem of directory)
    {
        let path: string = `${PATH}/${elem}`;
        let stats: fs.Stats = fs.lstatSync(path);

        if (stats.isDirectory() && fs.existsSync(path + "/index.js"))
            await visit(elem, path + "/index.js");
    }
}
main();