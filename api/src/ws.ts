import { Server } from 'http'
import { Server as IOServer, Socket } from 'socket.io';
import { Coordinates } from './core/interface/Coordinates';
import { getDistanceFromLatLonInKm } from './core/utils/calculateDistance'
import { parseStringAsArray } from './core/utils/parseStringAsArray'

interface ClientConnection {
    id: string,
    coordinates: Coordinates,
    techs: string[]
}

let io: IOServer;
const connections: ClientConnection[] = [];

export const setupWebSocket = (server: Server) => {
    io = new IOServer(server);

    io.on('connection', socket => {
        console.log(socket.id);
        const { latitude, longitude, techs } = socket.handshake.query;

        connections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: parseStringAsArray(String(techs)),
        })
    });
};

export const findConnections = (coordinates: Coordinates, techs: string[]) => {
    return connections.filter(connection => {
        return getDistanceFromLatLonInKm(coordinates, connection.coordinates) < 10
            && connection.techs.some(item => techs.includes(item));
    })
}

export const sendMessage = (to: ClientConnection[], message: string, data: any) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data);
    });
}