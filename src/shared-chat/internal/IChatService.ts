export interface IChatService
{
	setName(val: string): string[];
	talk(str: string): void;
}