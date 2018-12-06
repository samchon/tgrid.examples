import { HashMap } from "tstl/container";
import { SharedWorkerServer, SharedWorkerAcceptor } from "tgrid/protocols/workers";
import { Driver } from "tgrid/basic";

import { IChatService } from "./internal/IChatService";
import { IChatPrinter } from "./internal/IChatPrinter";

class ChatService implements IChatService
{
	private static participants_: HashMap<string, Driver<IChatPrinter>> = new HashMap();

	private driver_: Driver<IChatPrinter>;
	private name_: string;

	public constructor(driver: Driver<IChatPrinter>)
	{
		this.driver_ = driver;
	}

	public setName(str: string): string[]
	{
		if (ChatService.participants_.has(str))
			throw new Error("duplicated name exists."); // DUPLICATED NAME
		
		// SET NAME AND ENROLL IT TO DICTIONARY
		this.name_ = str;
		ChatService.participants_.emplace(str, this.driver_);

		// INFORMS PARTICIPANTS TO CLIENT
		let ret: string[] = [];
		for (let pair of ChatService.participants_)
			ret.push(pair.first);

		return ret;
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
	new SharedWorkerServer(async (acceptor: SharedWorkerAcceptor) =>
	{
		let service = new ChatService(acceptor.getDriver());

		acceptor.accept();
		acceptor.listen(service);
	});
}
main();