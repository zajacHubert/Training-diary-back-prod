import { Router } from "express";
import { TrainingRecord } from "../records/training.records";

export const trainingRouter = Router();

trainingRouter
    .get('/', async (req, res) => {
        const trainings = await TrainingRecord.getAll();
        res.json(trainings);

    })
    .post('/', async (req, res) => {
        const newTraining = new TrainingRecord(req.body);
        console.log(newTraining);

        await newTraining.insert();
    })