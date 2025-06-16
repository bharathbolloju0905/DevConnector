const http = require("http");
const app = require("./app");
const {initSocket} = require("./socket/socket");
const ConnectTODB = require("./DB/connect");

const server = http.createServer(app);
const port = process.env.PORT

initSocket(server);

server.listen(port, () => {
    ConnectTODB();
  console.log("Server running on port 3000");
});