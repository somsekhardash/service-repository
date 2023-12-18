import { ApolloServer } from "@apollo/server";
import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import { buildSubgraphSchema } from "@apollo/subgraph";
import typeDefs from "./schemas/types.graphql";
import resolvers from "./resolvers/resolvers";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import cookieSession  from "cookie-session";

import authRoute from "./api/auth";
import {notFound, errorHandler } from "./middlewares/errorHandler";

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

const successLoginUrl = "http://localhost:3000/";
const failLoginUrl = "http://localhost:3000/login/error";

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

      passport.use(
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
            scope: ["profile", "email"]
          },
          function (accessToken, refreshToken, profile, cb) {
            console.log("I am here", profile);
            // Verify user and perform actions
            return cb(null, profile);
          }
        )
      );
      passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      }); 
      this.app.use(cookieSession({
        name: 'dashmman',
        keys: ["dashman"],
        maxAge: 24 * 60 * 60 * 1000
      }));

      this.app.use(cors());
      this.app.use(express.json());
      this.app.use(passport.initialize());
      this.app.use(passport.session());
      
      this.app.get(
        "/auth/google",
        passport.authenticate("google", { scope: ["profile", "email"] })
      );

      this.app.get(
        "/auth/google/callback",
        passport.authenticate("google", { failureRedirect: failLoginUrl, successLoginUrl: successLoginUrl }),
        function (req, res) {
          console.log("I am there", res);
          // Successful authentication, redirect or handle as needed
          // res.send("thank you for signing in !!");
          res.redirect(successLoginUrl);
        }
      );

      this.app.use("/api/v1/", authRoute);

      this.app.use("/", isLoggedIn, (req, res) => {
        res.json({
          message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
        });
      });

      this.app.use("/login", (req, res) => {
        res.send("Somsething went wrong");
      })

      await server.start();
      this.app.use(
        "/graphql",
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server)
      );

      this.app.use(notFound);
      this.app.use(errorHandler);

      this.app.listen(this.PORT, () => {
        console.log(`Server is running on port: ${this.PORT}`);
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export const application = new Application();
