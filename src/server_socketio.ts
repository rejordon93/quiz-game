import { Server as IOServer } from "socket.io";
import type { Server as HTTPServer } from "http";


//Define Socket Server Class
export default class SocketIOServer {
  private io: IOServer;
  constructor(server: HTTPServer) {
    this.io = new IOServer(server, { cors: { origin: "*", methods: ["GET", "POST"] } });
  }
  
  public init(): void {
    this.listeners();
  } 

  private listeners(): void {

    // start listening for emitters when connection is on //
    // listeners for the game go here /
  }
}