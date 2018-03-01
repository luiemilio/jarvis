const liveServer = require("live-server");
const path = require("path");

const serverParams = {
    root: path.resolve("public"),
    open: false,
    logLevel: 2
};

//Start the server server and launch our app.
liveServer.start(serverParams).on("listening", () => {
    const {
        address,
        port
    } = liveServer.server.address();
});