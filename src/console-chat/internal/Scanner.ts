import * as rl from "readline";

export namespace Scanner
{
	export function read(question: string): Promise<string>
	{
		return new Promise(resolve =>
		{
			let scanner = rl.createInterface
			({
				input: process.stdin, 
				output: process.stdout
			});
			scanner.question(question, input =>
			{
				resolve(input);
				scanner.close();
			});
		});
	}
}