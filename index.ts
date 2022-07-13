import express, { json, Router } from "express";
import cors from 'cors';
import 'express-async-errors';
import { handleError } from "./utils/handleError";
import { trainingRouter } from "./routers/training-router";
import { config } from './config/config';

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());

const router = Router();
router.use

router.use('/training', trainingRouter);

app.use('/api', router);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('server is listening on port http://localhost:3001');
});