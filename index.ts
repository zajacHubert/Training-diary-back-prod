import express, { json } from "express";
import cors from 'cors';
import 'express-async-errors';
import { handleError } from "./utils/handleError";
import { trainingRouter } from "./routers/training-router";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());

app.use('/training', trainingRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('server is listening on port http://localhost:3001');
});