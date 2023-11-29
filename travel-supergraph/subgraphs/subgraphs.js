import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import { getHotelsSchema } from './hotels/subgraph.js';
import { getFlightsSchema } from './flights/subgraph.js';
import { getUsersSchema } from './users/subgraph.js';
import { getTripsSchema } from "./trips/subgraph.js";
import { getSuggestionsSchema } from "./suggestions/subgraph.js";

export const LOCAL_SUBGRAPH_CONFIG = [
  {
    name: 'flights',
    schema: getFlightsSchema()
  },
  {
    name: 'hotels',
    schema: getHotelsSchema()
  },
  {
    name: 'suggestions',
    schema: getSuggestionsSchema()
  },
  {
    name: 'trips',
    schema: getTripsSchema()
  },
  {
    name: 'users',
    schema: getUsersSchema()
  }
];

const getLocalSubgraphConfig = (subgraphName) =>
  LOCAL_SUBGRAPH_CONFIG.find(it => it.name === subgraphName);

export const startSubgraphs = async (httpPort) => {
  // Create a monolith express app for all subgraphs
  const app = express();
  const httpServer = http.createServer(app);
  const serverPort = process.env.PORT ?? httpPort;

  // Run each subgraph on the same http server, but at different paths
  for (const subgraph of LOCAL_SUBGRAPH_CONFIG) {
    const subgraphConfig = getLocalSubgraphConfig(subgraph.name);
    const server = new ApolloServer({
      schema: subgraphConfig.schema,
      // For a real subgraph introspection should be disabled, for the demo we have left on
      introspection: true,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await server.start();

    const path = `/${subgraphConfig.name}/graphql`;
    app.use(
      path,
      cors(),
      bodyParser.json(),
      expressMiddleware(server, {
        context: async ({ req }) => ({ headers: req.headers })
      })
    );

    console.log(`Setting up [${subgraphConfig.name}] subgraph at http://localhost:${serverPort}${path}`);
  }

  // Start entire monolith at given port
  // @ts-ignore
  await new Promise((resolve) => httpServer.listen({ port: serverPort }, resolve));
};
