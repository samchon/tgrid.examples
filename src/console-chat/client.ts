import { WebConnector } from "tgrid/protocol/web";
import { Promisify } from "tgrid/base";

import { Scanner } from "./internal/Scanner";
import { IChatService } from "./internal/IChatService";
import { IChatPrinter } from "./internal/IChatPrinter";

class ChatPrinter implements IChatPrinter
{
	public talk(name: string, content: string): void
	{
		console.log(`${name}: ${content}`);
	}
}

async function main(): Promise<void>
{
	//----
	// PREPARATIONS
	//----
	// CONNECT WITH LISTENER
	let connector: WebConnector = new WebConnector(new ChatPrinter());
	await connector.connect("ws://127.0.0.1:10103");

	// SPECIFY CONTROLLER
	let service: Promisify<IChatService> = connector.getDriver<IChatService>();

	//----
	// DO CHAT
	//----
	// SET MY NAME
	let nickname: string;
	while (true)
	{
		nickname = await Scanner.read("Insert your nickname: ");
		if (await service.setName(nickname) === true)
			break;
	}

	// TALK UNTIL QUIT
	while (true)
	{
		let content: string = await Scanner.read(nickname + ": ");
		if (content == "")
			break;

		await service.talk(content);
	}

	// QUIT
	await connector.close();
}
main().catch(exp =>
{
	console.log(exp);
});