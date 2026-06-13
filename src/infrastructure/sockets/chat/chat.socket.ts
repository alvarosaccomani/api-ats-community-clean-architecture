import { Socket } from "socket.io";
import SocketAdapter from "../../services/socketAdapter";

function configureChatSockets(socketAdapter: SocketAdapter) {
  socketAdapter.onConnection((socket: Socket) => {
    console.log(`Socket conectado para chat: ${socket.id}`);

    // Unirse a una sala de chat específica
    socket.on("joinRoom", (chr_uuid: string) => {
      if (chr_uuid) {
        console.log(`Socket ${socket.id} se unió a la sala: ${chr_uuid}`);
        socket.join(chr_uuid);
      }
    });

    // Salir de una sala de chat específica
    socket.on("leaveRoom", (chr_uuid: string) => {
      if (chr_uuid) {
        console.log(`Socket ${socket.id} abandonó la sala: ${chr_uuid}`);
        socket.leave(chr_uuid);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket desconectado: ${socket.id}`);
    });
  });
}

export default configureChatSockets;
