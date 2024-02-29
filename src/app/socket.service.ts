import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, fromEvent } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    private socket: Socket;

    constructor() {
        // this.socket = io('http://localhost:8080', { withCredentials: true });
        this.socket = io('https://m1p11mean-toavina-angela.onrender.com', { withCredentials: true });
    }

    connect(): void {
        // Logic for connecting to Socket.IO if necessary
    }


    // listenForRdvEvent() {
    //     return this.socket.fromEvent<any>('rdv');
    // }
    listenForRdvEvent(): Observable<any> {
        return new Observable((observer) => {
            this.socket.on('rdv', (data: any) => {
                observer.next(data);
            });
        });
    }

    sendMessage(message: string): void {
        this.socket.emit('message', message);
    }

    getMessage(): Observable<string> {
        return fromEvent(this.socket, 'message') as Observable<string>;
    }
}
