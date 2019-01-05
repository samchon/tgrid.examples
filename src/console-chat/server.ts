import { WebServer, WebAcceptor } from "tgrid/protocols/web";
import { Driver } from "tgrid/basic";

import { HashMap } from "tstl/container/HashMap";
import { IChatPrinter } from "./internal/IChatPrinter";
import { IChatService } from "./internal/IChatService";

class ChatService implements IChatService
{
	private static participants_: HashMap<string, Driver<IChatPrinter>> = new HashMap();

	private driver_: Driver<IChatPrinter>;
	private name_: string;

	public constructor(driver: Driver<IChatPrinter>)
	{
		this.driver_ = driver;
		this.name_ = null;
	}

	public destructor(): void
	{
		if (this.name_ !== null)
			ChatService.participants_.erase(this.name_);
	}

	public setName(str: string): boolean
	{
		if (ChatService.participants_.has(str))
			return false; // DUPLICATED NAME
		
		// SET NAME AND ENROLL IT TO DICTIONARY
		this.name_ = str;
		ChatService.participants_.emplace(str, this.driver_);

		// INFORMS TRUE TO CLIENT
		return true;
	}

	public talk(content: string): void
	{
		// INFORM TO EVERYBODY
		for (let it of ChatService.participants_)
		{
			let driver: Driver<IChatPrinter> = it.second;
			if (driver === this.driver_)
				continue; // SKIP HIMSELF

			// INFORM IT TO CLIENT
			driver.talk(this.name_, content);
		}
		console.log(this.name_ + ": " + content);
	}
}

async function main(): Promise<void>
{
	let server: WebServer = new WebServer();
	await server.open(10103, async (acceptor: WebAcceptor) =>
	{
		// PREPARE DRIVER
		let driver = acceptor.getDriver<IChatPrinter>();
		let service = new ChatService(driver);

		// HANDSHAKE
		await acceptor.accept(service);
		
		// DESTRUCTOR
		await acceptor.join();
		service.destructor();
	});
}
main();