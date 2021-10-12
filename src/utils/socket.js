const wsServer = window.location.host.replace("http://","ws://").replace("3000","8080");
export const socket = new WebSocket(`ws://${wsServer}`, []);

export const sendSocketMessage = (type, args) => {
    console.log(socket);
    socket.send(JSON.stringify({
        type,
        ...args
    }))
}