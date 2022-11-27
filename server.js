const express = require("express");
const app = express();
const server = require("http").Server(app);

app.use(express.static(__dirname + "/client/"));

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

server.listen(3000, () => {
    console.log(`App listening on port 3000`);
});