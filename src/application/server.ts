import { ApolloServer } from "@apollo/server";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSubgraphSchema } from "@apollo/subgraph";
import typeDefs from "./schemas/types.graphql";
import resolvers from "./resolvers/resolvers";
import cors from "cors";

class Application {
  public PORT = process.env.PORT || 5050;
  public app = express();
  public async init() {
    try {
      console.log(`Server is running on port: ${this.PORT}`);
      const server = new ApolloServer({
        schema: buildSubgraphSchema({
          typeDefs,
          resolvers,
        }),
      });
      this.app.use(cors());
      this.app.use(express.json());
      await server.start();
      this.app.use(
        "/graphql",
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server)
      );
      this.app.listen(this.PORT, () => {
        console.log(`Server is running on port: ${this.PORT}`);
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export const application = new Application();

