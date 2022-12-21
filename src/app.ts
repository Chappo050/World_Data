//IMPORTS
import { NextFunction, Response, Request, RequestHandler } from "express";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
const resolvers = require("./resolvers");
const models = require("./models");
const typeDefs = require("./types");
const { expressjwt: jwt } = require("express-jwt");
import { decodedToken } from "./authenticate";

//Interfaces
interface Error {
  status?: number;
  message?: String;
}

var debug = require("debug")("profile-blog:server");
var http = require("http");
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cors = require("cors");
const flash = require("express-flash");

const compression = require("compression"); //Compression
const helmet = require("helmet"); //Protection

interface UserCookie {
  username: String,
  iat: Number,
  exp: Number
}

export async function startApolloServer(typeDefs: any, resolvers: any) {
  //SERVER SETUP STUFF
  var app = express();
  var port = normalizePort(process.env.PORT || "5000");
  app.set("port", port);
  var httpServer = http.createServer(app);

  //READ .ENV

  const dotenv = require("dotenv");
  dotenv.config();

  //Cookie middleware
  app.use(cookieParser());
  app.use(
    jwt({
      secret: process.env.TOKEN_SECRET,
      algorithms: ["HS256"],
      expiresIn: "2s",
      credentialsRequired: false,
    })
  );

  //Apollo server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: ({ req, res }) => {
      //can move into each resolver if needed.
      let user: UserCookie| null;
      if (req.cookies["token"]) {
        user = decodedToken(req);
        if (user) {
          console.log(user.username);
          
        }
      } else {
        user = null;
      }

      return { user, req, res, models };
    },
  }) as any;

  await server.start(); //start the GraphQL server.
  server.applyMiddleware({ app });


  //END SERVER SETUP

  // Set up mongoose connection to mongoDB
  const mongoose = require("mongoose");
  const mongoDB = process.env.MONGODB_URI;

  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));

  //Middleware
  app.use(cors({ origin: "*", credentials: true }));
  app.use(flash());
  app.use(helmet());
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  app.use(logger("dev"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  app.use(compression()); //Compress all routes
  app.use(express.static(path.join(__dirname, "../client/build")));

  // catch 404 and forward to error handler
  app.use(function (req: Request, res: Response, next: NextFunction) {
    next(createError(404));
  });

  // error handler
  app.use(function (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
  });


  await new Promise<void>((resolve) => httpServer.listen(port, resolve));

  //Server responses
  httpServer.on("error", onError);
  httpServer.on("listening", onListening);
  console.log(`Server ready at http://localhost:5000${server.graphqlPath}`);

  function normalizePort(val: any) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }
  function onError(error: any) {
    if (error.syscall !== "listen") {
      throw error;
    }

    var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case "EACCES":
        console.error(bind + " requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error(bind + " is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
  function onListening() {
    var addr = httpServer.address();
    var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    debug("Listening on " + bind);
  }


  app.get("/*", function (req: Request, res: Response) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

}

startApolloServer(typeDefs, resolvers);
