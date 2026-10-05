import {
    service_path,
    WS_BASE_URL
} from "../Redux/constant";
import { resetToSplash } from "../Navbar/navHook";
import { TicketBookingRequestType } from "../types/dataTypes";

type Callback<T = any> = (data: T) => void;

class SocketService {
    private static instance: SocketService;

    private socket: WebSocket | null = null;

    private callbacks: Record<string, Callback[]> = {};

    private constructor() { }

    static getInstance() {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    connect(token: string) {
        if (
            this.socket &&
            (
                this.socket.readyState === WebSocket.OPEN ||
                this.socket.readyState === WebSocket.CONNECTING
            )
        ) {
            return;
        }

        const url = `${WS_BASE_URL}${service_path.ws}/user?token=${encodeURIComponent(token)}`;

        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log("Connected")
        }

        this.socket.onmessage = (event) => {
            const message = JSON.parse(event.data)

            console.log(message, "<---------ws")

            switch (message.type) {
                case "REQUEST_BOOKING":
                    console.log("Emitting REQUEST_BOOKING")
                    this.executeCallbacks("REQUEST_BOOKING", {
                        tickets: message.payload.tickets,
                        room_code: message.payload.room_code,
                        userId: message.payload.user_id,
                    });
                    break;

                case "CONNECTED":
                    this.executeCallbacks("CONNECTED", message.user_id)
                    break;

                default:
                    this.executeCallbacks(message.type, message.payload);
            }
        }
    }
    disconnect(userId: string) {
        if (!this.socket) return;

        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(
                JSON.stringify({
                    type: "DISCONNECT",
                    user_id: userId,
                })
            );
        }

        this.socket.close();
        this.socket = null;
    }
    isConnected(): boolean {
        return this.socket?.readyState === WebSocket.OPEN;
    }

    send(data: any) {
        if (this.socket?.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        }
    }

    addCallbacks(event: string, callback: Callback) {
        if (!this.callbacks[event]) {
            this.callbacks[event] = [];
        }

        this.callbacks[event].push(callback);
    }

    removeCallbacks(
        event: string,
        callback: Callback
    ) {
        if (!this.callbacks[event]) return;

        this.callbacks[event] = this.callbacks[event].filter(
            cb => cb !== callback
        );
    }

    private executeCallbacks(
        event: string,
        data: any
    ) {
        console.log("ev==>",event)
        this.callbacks[event]?.forEach(cb => {
            console.log(cb,"<<<<cb")
            cb(data)
        })
    }
}

export default SocketService.getInstance();