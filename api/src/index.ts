import { MONGODB_DATABASE, MONGODB_PORT, MONGODB_URL } from "./core/constants/environments";
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { routes } from './routes';
import { setupWebSocket } from './ws';

const app = express();
const server = new http.Server(app);

setupWebSocket(server);

mongoose.connect(`mongodb://${MONGODB_URL}:${MONGODB_PORT}/${MONGODB_DATABASE}`, {
    appName: 'devradar',
    dbName: 'devradar'
});

app.use(cors());
app.use(express.json());
app.use(routes);


server.listen(3333);