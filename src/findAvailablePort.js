const net = require("net");

function tryToListen(host, port) {
    return new Promise((resolve, reject) => {
        var server = net.createServer();
        server.listen(port, host);

        server.on("listening", () => {
            server.close();
            resolve();
        })

        server.on("error", (err) => {
            server.close();
            reject(err);
        })
    });
}

async function checkAvailable(port) {
    try {
        await tryToListen("", port),
        await tryToListen("::", port),
        await tryToListen("0.0.0.0", port),
        await tryToListen("127.0.0.1", port),
        await tryToListen("localhost", port)
    } catch (e) {
        return false;
    }
    return true;
}

module.exports = async function (port, retry = Infinity) {
    for (let i = 0; i < retry; i++){
        let available = await checkAvailable(port);
        if (!available) {
            port += Math.ceil(Math.random() * 7);
        } else {
            return port;
        }
    }
}