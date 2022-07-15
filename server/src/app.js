import express from 'express';
import config from './config.js';
import router from './components/animals/routes/animals.routes.js';
import cors from 'cors';

const app = express();

app.set('port', config.PORT);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

export default app;
