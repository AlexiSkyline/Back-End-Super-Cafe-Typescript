import dotenv from 'dotenv';
import Server from './Models/Server';

// * Configuración de variables de entorno
dotenv.config();

const server = new Server();

server.listen();