const hapi = require("hapi");

const server = new hapi.Server();

const routes = require("./routes");

server.connection({
  host: "localhost",
  port: 4040,
  routes: {
    cors: true
  },
  router: {
    stripTrailingSlash: true
  }
});

server.route(routes);

server.start(error => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Server started at ${server.info.uri}`);
  }
});
