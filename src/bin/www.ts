import { createServer, Server } from "http";
import { app } from "../app";
import { initApolloServer } from "../graphql/server";
import { connectToMongo } from "../services/mongo-connector";

const httpServer: Server = createServer();

(async () => {
    const port = 3000;
    await connectToMongo();
    await initApolloServer(httpServer, app);
    httpServer.listen(port);
    httpServer.on("request", app.callback());
    httpServer.on("error", e => console.log(e));
    httpServer.on("listening", () => console.log(`listening on port ${port}`));
})()