import express from 'express';
import routes from './routes.js';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(express.json());

const corsOpt = {
    origin: 'http://localhost:3000', // Substitua pela origem permitida
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    optionsSuccessStatus: 204, // Código de status para opções bem-sucedidas
};

app.use(cors(corsOpt));

app.use('/api', routes);

app.listen(port, () => {
    console.log(`API online, porta: ${port}`);
});