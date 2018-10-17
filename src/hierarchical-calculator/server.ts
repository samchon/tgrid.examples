import { WebServer, WebAcceptor } from "tgrid/protocol/web";
import { Calculator } from "./internal/Calculator";

function main(): void
{
	let server: WebServer = new WebServer();
	server.open(10102, async (acceptor: WebAcceptor) =>
	{
		await acceptor.accept();
		await acceptor.listen(new Calculator());
	});
}
main();