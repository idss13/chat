import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";



/**
 * O chat pode ficar rodando em qualquer porta que esteja disponivel, por exemplo:
 * @WebSocketGateway(8080)
 */
@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()

    handleConnection(client) {
        console.log(client.id + ' conectado...');
        client.broadcast.emit('users', {
            user: client.id,
            action: 'connected'
        });
    }

    handleDisconnect(client: any) {
        console.log(client.id + ' desconectado...');
        client.broadcast.emit('users', {
            user: client.id,
            action: 'disconnected'
        });
    }

    @SubscribeMessage('chat')
    chat(client: any, data: any) {
        console.log(data);
        //client.emit(client.id, 'Mensagem');  -> Mandar mensagem para um client específico
        client.broadcast.emit('chat', data);
        return data;
    }

    @SubscribeMessage('users')
    users(cliente: any, data: any) {
        console.log(data);
        return data;
    }

}
