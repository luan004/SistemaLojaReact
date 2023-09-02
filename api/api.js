import express from 'express';
import routes from './routes.js';

const app = express();
const port = 3001;

app.use(express.json());

app.use('/api', routes);

app.listen(port, () => {
    console.log(`API online, porta: ${port}`);
});