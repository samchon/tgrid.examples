import * as React from "react";

import { SharedWorkerConnector } from "tgrid/protocols/workers";
import { Driver } from "tgrid/basic";
import { IChatService } from "./internal/IChatService";

import { ChatPrinter } from "./internal/ChatPrinter";

export class Application extends React.Component
{
	private connector_: SharedWorkerConnector;
	private provider_: ChatPrinter;
	private driver_: Driver<IChatService>;

	public constructor()
	{
		super({});

		(async () =>
		{
			this.provider_ = new ChatPrinter(() => this.setState({}));
			
			this.connector_ = new SharedWorkerConnector(this.provider_);
			await this.connector_.connect("server.bundle.js");
			await this.connector_.wait();

			this.driver_ = this.connector_.getDriver<IChatService>();

			while (true)
				try
				{
					let name: string = prompt("Insert your name");
					let participants: string[] = await this.driver_.setName(name);

					this.provider_.names.push(...participants);
				}
				catch (e)
				{
					alert(e.message);
					continue;
				}
		})();
	}

	public render(): JSX.Element
	{
		return <div>
			
		</div>;
	}
}