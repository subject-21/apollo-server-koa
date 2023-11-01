import { Server } from "http";
import { ApolloServer } from "@apollo/server";
import { default as Koa } from "koa";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { typeDefs } from "../graphql/schemas/schema";
import { resolvers } from "../graphql/resolvers/resolver";
import { koaMiddleware } from "@as-integrations/koa";
import { PubSub } from "graphql-subscriptions";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';

export const pubsub = new PubSub();
const schema = makeExecutableSchema({ typeDefs, resolvers });

export const initApolloServer = async (httpServer: Server, app: Koa) => {
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql"
    });
    const serverCleanup = useServer({ schema }, wsServer);
    const server = new ApolloServer({
        schema: schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose();
                        },
                    };
                }

            },
        ]
    });

    await server.start();
    app.use(
        koaMiddleware(server, {
            context: async ({ ctx }) => ({ token: ctx.headers.token }),
        })
    );
}