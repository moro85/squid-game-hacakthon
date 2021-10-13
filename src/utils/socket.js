const wsServer = window.location.host.replace("3000","8080");
const wsServerType = document.location.origin.indexOf("http://") > -1 ? "ws://" : "wss://";
export const socket = new WebSocket(`${wsServerType}${wsServer}`, []);
export const sendSocketMessage = (type, args) => {
    console.log({socket});
    console.log({type});
    console.log({args});
    socket.send(JSON.stringify({
        type,
        ...args
    }))
}