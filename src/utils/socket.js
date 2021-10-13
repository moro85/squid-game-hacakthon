const wsServer = window.location.host.replace("http://","ws://").replace("https://","wss://").replace("3000","8080");
export const socket = new WebSocket(`ws://${wsServer}`, []);

export const sendSocketMessage = (type, args) => {
    console.log({socket});
    console.log({type});
    console.log({args});
    socket.send(JSON.stringify({
        type,
        ...args
    }))
}