import { WebServer } from "tgrid/protocol/web";
import { Calculator } from "./internal/Calculator";

function main(): void
{
	let server = new WebServer();
	server.open(10101, async acceptor =>
	{
		await acceptor.accept();
		await acceptor.listen(new Calculator());
	});
}
main();