export interface IChatPrinter
{
	// PARTICIPANTS I/O
	insert(name: string): void;
	erase(name: string): void;

	// MESSAGE
	talk(name: string, content: string): void;
}