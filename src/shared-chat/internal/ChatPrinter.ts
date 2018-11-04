import { HashSet } from "tstl/container";
import { Pair } from "tstl/utility";

export class ChatPrinter
{
	private refresher_: ()=>void;

	public readonly names: HashSet<string>;
	public readonly messages: Pair<string, string>[];

	public constructor(refresher: ()=>void)
	{
		this.refresher_ = refresher;
		this.names = new HashSet<string>();
		this.messages = [];
	}

	public insert(name: string): void
	{
		this.names.insert(name);
		this.refresher_();
	}
	public erase(name: string): void
	{
		this.names.erase(name);
		this.refresher_();
	}

	public talk(name: string, message: string): void
	{
		this.messages.push(new Pair(name, message));
		this.refresher_();
	}
}